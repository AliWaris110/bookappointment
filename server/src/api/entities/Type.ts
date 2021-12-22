import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';
import {IsString,IsNumber} from 'class-validator';

// export type Role = 'user'  | 'admin';

@Entity()
export class Type {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  @IsString()
  typeName?: string;



  // @Column()
  // @IsNumber()
  // duration?: Number;


 
  public constructor(data?: Type) {
    if (data) {
      this.typeName = data.typeName;
     
     
    }
  }

//   public hasAccessTo?(role: Role): boolean {
//     const roles = ['user', 'staff', 'admin'];
//     return roles.indexOf(this.role) >= roles.indexOf(role);
//   }
}
