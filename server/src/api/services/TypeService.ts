import jwt from 'jsonwebtoken';

import config from '../../config';
import { Inject, Service } from 'typedi';
import { Type } from '../entities/Type';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Logger } from 'winston';
import {
  ITypeInputDTO,
  ITypeResponseDTO,
} from '../../types';
import { validate } from 'class-validator';
import CRUD from './CRUD';
import { ErrorHandler } from '../../helpers/ErrorHandler';

@Service({ transient: true })
export default class TypeService extends CRUD<Type> {
  public request: any;
  constructor(
    @InjectRepository(Type)
    protected typeRepo: MongoRepository<Type>,
    @Inject('logger')
    protected logger: Logger
  ) {
    super(typeRepo, logger);
  }

  public set setRequest(request: any) {
    this.request = request;
  }
  public get getRequest() {
    return this.request;
  }

  getRepo(): MongoRepository<Type> {
    return this.typeRepo;
  }

  async createType(
    typeInputDTO: ITypeInputDTO
  ): Promise<ITypeResponseDTO> {
    this.logger.debug('Type(service) setting ...');

    const { id } = this.request.currentUser;
    const newType = new Type({
      typeName: typeInputDTO.typeName,
    
    });
    const errors = await validate(newType, {
      validationError: { target: false },
    });
    if (errors.length > 0) throw errors;

    const foundtype = await this.typeRepo.findOne({
      typeName: newType.typeName,
      
    });

    if (foundtype)
      throw new ErrorHandler(400, 'The type already exists');

    const typeRecord: Type = await this.typeRepo.save(newType);
    if (!typeRecord)
      throw new ErrorHandler(500, 'type(Service) cannot be created');

    // const token = this.generateToken(typeRecord);
    const type = typeRecord;
    return { type };
  }

  generateToken(typeRecord: Type): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 7);
    this.logger.debug(`Signing JWT for bookingId: ${typeRecord.id}`);
    return jwt.sign(
      {
        id: typeRecord.id,

        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }

  async find(): Promise<Type[]> {
    const type = await this.repo.find();
    for (const b of type) {
      // Reflect.deleteProperty(user, 'password');
    }
    return type;
  }

  //   async findOne(id: string): Promise<Booking | undefined> {
  //     const booking = await this.repo.findOne(id);
  //     if (booking) {
  //       Reflect.deleteProperty(booking, 'password');
  //     }
  //     return booking;
  //   }





  //////Getting type id with name//////
  // async getTypeIdWithName(typeName: string): Promise<Type | undefined> {
  //   const typeId = await this.repo.findOne(typeName);
    
  //   return typeId;
  // }

}
