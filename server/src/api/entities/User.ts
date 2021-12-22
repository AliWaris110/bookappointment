import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  Index,
  OneToMany,
  CreateDateColumn,
  Double,
} from 'typeorm';
import { IsEmail, IsString, IsBoolean } from 'class-validator';
import { RefreshToken } from './RefreshToken';
export type Role = 'user' | 'admin';

@Entity()
export class User {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  @IsString()
  firstName?: string;

  @Column()
  @IsString()
  lastName?: string;

  @Column()
  @Index({ unique: true })
  @IsEmail(
    {},
    {
      message: 'Invalid email address',
    }
  )
  email?: string;

  @Column()
  @IsString()
  password?: string;

  @Column()
  role?: Role = 'user';

  @Column()
  @IsString()
  verificationToken?: string;

  @Column()
  verified?: string;

  @Column()
  resetToken?: string;

  @Column()
  expires?: number;

  @Column()
  passwordReset?: string;

  @CreateDateColumn()
  created?: Date;

  @Column()
  @IsBoolean()
  active?: Boolean;

  @OneToMany(() => RefreshToken, (refresh_token) => refresh_token.user)
  refresh_token?: RefreshToken;

  public constructor(data?: User) {
    if (data) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.password = data.password;
      this.role = data.role || this.role;
      this.verificationToken = data.verificationToken || '';
      this.verified = data.verified;
      this.resetToken = data.resetToken;
      this.passwordReset = data.passwordReset;
      this.created = data.created;
      this.active=data.active;
    }
    console.log('Contructor Role:', this);
  }

  public hasAccessTo?(role: Role): boolean {
    const roles = ['user', 'mod', 'admin'];
    console.log('1-Checking role: ', this.role);
    console.log('2-Checking role: ', role);
    return roles.indexOf(this.role) >= roles.indexOf(role);
  }
}
