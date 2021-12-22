import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export type Role = 'user' | 'admin';

@Entity()
export class Booking {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  title?: string;

  @Column()
  @IsString()
  venue?: string;

  @Column()
  @IsString()
  location?: string;

  @CreateDateColumn()
  date?: Date;

  @Column()
  @IsString()
  time?: string;

  @Column()
  @IsString()
  status?: String;

  @Column()
  typeId?: Number;

  @Column()
  userId?: Number;

  @Column()
  createdBy?: Number;

  @CreateDateColumn()
  createdDate?: Date;

  @Column()
  modifiedBy?: Number;

  @CreateDateColumn()
  modifiedDate?: Date;

  @Column()
  @IsBoolean()
  active?: Boolean;

  public constructor(data?: Booking) {
  
    if (data) {
      (this.title = data.title),
        (this.venue = data.venue),
        (this.location = data.location),
        (this.date = data.date),
        (this.time = data.time),
        (this.status = data.status),
        (this.typeId = data.typeId),
        (this.userId = data.userId),
        (this.createdBy = data.createdBy),
        (this.createdDate = data.createdDate),
        (this.modifiedBy = data.modifiedBy),
        (this.modifiedDate = data.modifiedDate),
        (this.active = data.active);
    }
  }
}
