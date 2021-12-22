import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  Index,
  ManyToOne,
  CreateDateColumn,
  JoinColumn
  
} from 'typeorm';
import { IsString, IsNumber,IsBoolean } from 'class-validator';
import { User } from './User';
///UserToken
@Entity()
export class RefreshToken {
  @ObjectIdColumn()
  id?: ObjectID;


  @ManyToOne(
    (type) => User,
    (user) => user.id,
    { cascade: true, eager: true }
    
  )
  @JoinColumn()
    user:User
  
  


  @Column()
  @IsString()
  token: String;

  @CreateDateColumn()
  expires: Date;

  @CreateDateColumn()
  created: Date;

  @Column()
  @IsString()
  createdByIp: String;

  @CreateDateColumn()
  revoked: Date;

  @Column()
  @IsString()
  revokedByIp: String;

  @Column()
  @IsString()
  replacedByToken: String;


  @Column()
  @IsBoolean()
  isActive: boolean | false;


  public constructor(data?: RefreshToken) {
    if (data) {
      this.user = data.user;
      this.token = data.token;
      this.expires = data.expires;
      this.created = data.created;
      this.createdByIp = data.createdByIp;
      this.revoked = data.revoked;
      this.revokedByIp = data.revokedByIp;
      this.replacedByToken = data.replacedByToken;
    }
  }

 
}
