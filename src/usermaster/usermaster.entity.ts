import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class usermaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column({ length: 100 })
  @MinLength(1)
  @MaxLength(100)
  @IsString()
  UserName: string;

  @Column({ length: 45 })
  @MinLength(8)
  @IsString()
  password: string;

  @Column({ length: 2 })
  @MinLength(1)
  @IsString()
  loggedIn : string;

  @Column()
  @MinLength(10)
  @IsString()
  lastloginIn : string;

  @Column({ length: 500 })
  @MaxLength(500)
  @IsString()
  token:string;
}
