import jwt from 'express-jwt';
import { User } from '../api/entities/User';
import { Booking } from '../api/entities/Booking';
import { Type } from '../api/entities/Type';
import { RefreshToken } from 'src/api/entities/RefreshToken';

export type Role = 'user' | 'admin';
// export type RefreshToken =string;

declare global {
  namespace Express {
    export interface Request {
      currentUser: User;
      jwtToken: Token;
    }
  }
}

export type Token = jwt.Options;

export type Factory<Entity> = (data?: Entity) => Promise<Entity> | Entity;
///////User's Inrterface for type checking////////////////
export interface IUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
 
}

export interface IUserResponseDTO {
  user: User;
  jwtToken: string;
  refreshToken?:String;
  isUserExists?:boolean;
}

/////Booking's Interace for type checking///////

export interface IBookingInputDTO {
  title: string;
  venue: string;
  location: string;
  date: Date;
  time: string;
  status: string;
  typeId: number;
  userId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  active: boolean;
}

export interface IBookingResponseDTO {
  booking: Booking;
  jwtToken: string;
}
////Type  Interface for type checking//////
export interface ITypeInputDTO {
  typeName: string;
  
}

export interface ITypeResponseDTO {
  type: Type;
  // token: string;
}

