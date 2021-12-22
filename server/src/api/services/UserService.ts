import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import config from '../../config';
import { Inject, Service } from 'typedi';
import { User } from '../entities/User';
import { MongoRepository, MoreThan } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Logger } from 'winston';
import { IUserInputDTO, IUserResponseDTO } from '../../types';
import { validate } from 'class-validator';
import CRUD from './CRUD';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { RefreshToken } from '../entities/RefreshToken';
import SendEmail from '../../helpers/send-email';
import { format } from 'date-fns';
// const sendEmail = require('_helpers/send-email');
@Service({transient:true})
export default class UserService extends CRUD<User> {

  public request: any;
  constructor(
    @InjectRepository(User)
    protected userRepo: MongoRepository<User>,

    @InjectRepository(RefreshToken)
    protected refreshTokenRepo: MongoRepository<RefreshToken>,
    @Inject('logger')
    protected logger: Logger
  ) {
    super(userRepo, logger);
  }

  public set setRequest(request: any) {
    this.request = request;
  }
  public get getRequest() {
    return this.request;
  }
  getRepo(): MongoRepository<User> {
    return this.userRepo;
  }

  async register(
    userInputDTO: IUserInputDTO,
    origin: any
  ): Promise<IUserResponseDTO> {
    this.logger.debug('Registering user...');

    const hashedPassword = await this.hash(userInputDTO.password);
    const newUser = new User({
      firstName: userInputDTO.firstName,
      lastName: userInputDTO.lastName,
      email: userInputDTO.email,
      password: hashedPassword,
      role: userInputDTO.role,
      active:true
      // refresh_token: userInputDTO.refresh_token,
    });

    const errors = await validate(newUser, {
      validationError: { target: false },
    });
    if (errors.length > 0) throw errors;

    const foundUser = await this.userRepo.findOne({ email: newUser.email });
    let isUserExists = false;
    if (foundUser) {
      // isUserExists=!isUserExists;

      // console.log('checking isUserExists: ',isUserExists)
      throw new ErrorHandler(400, 'The email address already exists');
    }

    ///assigning randomtoken temp/////
    newUser.verificationToken = this.randomTokenString();
    /////save user/////
    const userRecord: User = await this.userRepo.save(newUser);
    if (!userRecord) throw new ErrorHandler(500, 'User cannot be created');

    // send email
    await this.sendVerificationEmail(userRecord, origin);
    const jwtToken = this.generateJwtToken(userRecord);

    const user = userRecord;
    Reflect.deleteProperty(user, 'password');
    return { user, jwtToken, isUserExists: isUserExists };
  }

  //////verify email with token sent to email////
  async verifyEmail({ token }) {
    const user = await this.userRepo.findOne({ verificationToken: token });

    if (!user) throw 'Verification failed';

    user.verified = new Date().toISOString();
    user.verificationToken = undefined;
    console.log('after deleting user will be: ', user);
    await this.userRepo.update(user.id, user);
  }

  ///////////forgot password function ////////
  async forgotPassword({ email }, origin: any) {
    const user = await this.userRepo.findOne({ email });

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 24 hours
    user.resetToken = this.randomTokenString();
    user.expires = Date.now() + 24 * 60 * 60 * 1000;

    await this.userRepo.update(user.id, user);

    // send email
    await this.sendPasswordResetEmail(user, origin);
  }

  //////send password reset email ////////

  async sendPasswordResetEmail(user: User, origin: any) {
    let message: string;
    if (origin) {
      const resetUrl = `${origin}/account/reset-password?token=${user.resetToken}`;
      message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                 <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
      message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                 <p><code>${user.resetToken}</code></p>`;
    }

    await SendEmail.sendEmail({
      to: user.email,
      subject: 'Sign-up Verification API - Reset Password',
      html: `<h4>Reset Password Email</h4>
             ${message}`,
    });
  }

  //////Reset Password///////

  async resetPassword({ token, password }) {
    const currentUtcTimeAsSqliteString = Date.now();

    const user = await this.userRepo.findOne({
      where: {
        resetToken: token,

        expires: { $gt: currentUtcTimeAsSqliteString },
      },
    });

    if (!user) throw 'Invalid token';

    // update password and remove reset token
    user.password = await this.hash(password);
    user.passwordReset = new Date().toISOString();
    user.resetToken = undefined;
    console.log('Inside of resetPassword: ', user);
    await this.userRepo.update(user.id, user);
  }

  //////CHECKING WHETHER USER IS VERIFIED WITH TOKEN OR NOT/////
  isVerified(userRecord: any) {
    return !!(userRecord.verified != null || userRecord.passwordReset != null);
  }

  async login(
    email: string,
    password: string,
    ipAddress: string
  ): Promise<IUserResponseDTO> {
    this.logger.debug('Authenticating user...');
    const userRecord = await this.userRepo.findOne({ email });

    if (!userRecord)
      throw new ErrorHandler(
        404,
        "Account  doesn't Exists please create new one"
      );
    if (!this.isVerified(userRecord))
      throw new ErrorHandler(
        403,
        'Please Verify your email id Before you login '
      );

    const validPassword = await bcrypt.compare(password, userRecord.password);

    if (validPassword) {
      // authentication successful so generate jwt and refresh tokens

      const jwtToken = this.generateJwtToken(userRecord);
      const refreshToken = await this.generateRefreshToken(
        userRecord,
        ipAddress
      );
      this.refreshTokenRepo.save(refreshToken);

      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      return { user, jwtToken, refreshToken: refreshToken.token };
    }
    throw new ErrorHandler(405, 'Invalid email or password');
  }
  /////GetRefreshToken////////

  isActive(refreshToken: any) {
    return !refreshToken.revoked && !refreshToken.isExpired;
  }
  async getRefreshToken(token: string) {
    const refreshToken = await this.refreshTokenRepo.findOne(
      { token },
      { relations: ['user'] }
    );
    if (!refreshToken || !this.isActive(refreshToken)) throw 'Invalid token';
    return refreshToken;
  }

  async hash(password: string) {
    return await bcrypt.hash(password, 12);
  }
  generateJwtToken(userRecord: User): string {
    // create a jwt token containing the account id that expires in 15 minutes
   return jwt.sign(
      { id: userRecord.id, email: userRecord.email },
      config.jwtSecret,
      { expiresIn: "15m" }
      
    );
    
    
    
  }

  async generateRefreshToken(user: User, ipAddress: string) {
    // create a refresh token that expires in 7 days
    const refreshToken: Partial<RefreshToken> = {
      // user: user.id,
      token: this.randomTokenString(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdByIp: ipAddress,
    };
    return refreshToken;
  }

  randomTokenString(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  async find(): Promise<User[]> {
    const users = await this.repo.find();
    for (const user of users) {
      Reflect.deleteProperty(user, 'password');
    }
    // console.log('Request value getting: ',this.request.currentUser);
    return users;
  }

  /////Revoke Token///////
  async revokeToken({ token, ipAddress }) {
    const refreshToken = await this.getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = new Date(Date.now());
    refreshToken.revokedByIp = ipAddress;
    await this.refreshTokenRepo.update(refreshToken.id, refreshToken);
  }

  ////////////refreshToken///////////
  async refreshToken({ token, ipAddress }) {
    const refreshToken = await this.getRefreshToken(token);
    // const { user } = refreshToken;
    console.log('RefreshToken in refreshToken Method: ', refreshToken);
    // replace old refresh token with a new one and save
    // const newRefreshToken = await this.generateRefreshToken(user, ipAddress);
    // refreshToken.revoked =new Date(Date.now());
    // refreshToken.revokedByIp = ipAddress;
    // refreshToken.replacedByToken = newRefreshToken.token;
    // await refreshToken.save();
    // await newRefreshToken.save();

    // // generate new jwt
    // const jwtToken = generateJwtToken(account);

    // // return basic details and tokens
    // return {
    //     ...basicDetails(account),
    //     jwtToken,
    //     refreshToken: newRefreshToken.token
    // };
  }

  ////////SendVerificationEmail////////
  async sendVerificationEmail(user: User, origin: any) {
    let message: string;
    if (origin) {
      const verifyUrl = `${origin}/verify-email?token=${user.verificationToken}`;
      message = `<p>Please click the below link to verify your email address:</p>
                    
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>
                   <p>Or copy and paste this token ${user.verificationToken}
                   in the form of ${origin}/verify-email link
                   </p>
                   `;
    } else {
      message = `
      <p>Please use the below token to verify your email address with the <code>/verify-email</code> api route:</p>
                   <p><code>${user.verificationToken}</code></p>`;
    }

    await SendEmail.sendEmail({
      to: user.email,
      subject: 'Sign-up Verification API - Verify Email',
      html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`,
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.repo.findOne(id);
    if (user) {
      Reflect.deleteProperty(user, 'password');
    }
    return user;
  }

  // async findUserJWT(jwt: string): Promise<User | undefined> {
  //   const  = await this.repo.findOne({jwtToken:jwt});
  //   if (booking) {
  //     Reflect.deleteProperty(booking, 'password');
  //   }
  //   return booking;
  // }
}
