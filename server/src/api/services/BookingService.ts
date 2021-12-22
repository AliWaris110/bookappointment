import jwt from 'jsonwebtoken';

import config from '../../config';
import { Inject, Service } from 'typedi';
import { Booking } from '../entities/Booking';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Logger } from 'winston';
import {
  IBookingInputDTO,
  IBookingResponseDTO,
  IUserInputDTO,
  IUserResponseDTO,
} from '../../types';
import { validate } from 'class-validator';
import CRUD from './CRUD';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import UserService from './UserService';

@Service({ transient: true })
export default class BookingService extends CRUD<Booking> {
  public request: any;
  constructor(
    @InjectRepository(Booking)
    protected bookingRepo: MongoRepository<Booking>,
    @Inject('logger')
    protected logger: Logger
  ) {
    super(bookingRepo, logger);
  }

  public set setRequest(request: any) {
    this.request = request;
  }
  public get getRequest() {
    return this.request;
  }

  getRepo(): MongoRepository<Booking> {
    return this.bookingRepo;
  }

  /////Create new booking ////////
  async createBooking(
    bookingInputDTO: IBookingInputDTO
  ): Promise<IBookingResponseDTO> {
    this.logger.debug('Booking Appointment ...');

    // if(  ){

    // }
    console.log('active in BookingService1:', bookingInputDTO.active);
    const { id } = this.request.currentUser;
    const newBooking = new Booking({
      title: bookingInputDTO.title,
      venue: bookingInputDTO.venue,
      location: bookingInputDTO.location,
      date: bookingInputDTO.date || null,
      time: bookingInputDTO.time || '',
      status: bookingInputDTO.status,
      typeId: bookingInputDTO.typeId,
      userId: id,
      createdBy: id,
      createdDate: bookingInputDTO.createdDate || null,
      modifiedBy: bookingInputDTO.modifiedBy || null,
      modifiedDate: bookingInputDTO.modifiedDate || null,
      active: true,
    });
 
    const errors = await validate(newBooking, {
      validationError: { target: false },
    });
    if (errors.length > 0) throw errors;

    const foundBooking = await this.bookingRepo.findOne({
      time: newBooking.time,
      userId: id,
      active: true,
    });

    if (foundBooking && (Number(foundBooking.time) > Number(newBooking.time) && Number(foundBooking.time) <= Number(foundBooking.time)+(30*60) ))
      throw new ErrorHandler(400, 'The booking of same user already exists');

    const bookingRecord: Booking = await this.bookingRepo.save(newBooking);
    if (!bookingRecord)
      throw new ErrorHandler(500, 'booking cannot be created');

    const jwtToken = this.generateToken(bookingRecord);
    const booking = bookingRecord;
    return { booking, jwtToken };
  }

  ////Generating JWT token for Auth////
  generateToken(bookingRecord: Booking): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 7);
    this.logger.debug(`Signing JWT for bookingId: ${bookingRecord.id}`);
    return jwt.sign(
      {
        id: bookingRecord.id,

        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }

  async find(): Promise<Booking[]> {
    const booking = await this.repo.find();
    for (const b of booking) {
      // Reflect.deleteProperty(user, 'password');
    }
    return booking;
  }

   
}
