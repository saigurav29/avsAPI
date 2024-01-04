import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsNumber, IsString, Max, MaxLength, Min, MinLength, isNumber, minLength } from 'class-validator';

@Entity()
export class Flatlaboursitems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  flatid: number;

  @Column()
  @IsNumber()
  labourid: number;

  @Column()
  @IsString()
  startdate: Date;

  @Column()
  @IsString()
  enddate: Date;
  
  @Column()
  @IsString()
  leavestaken: number;
  
  @Column()
  @IsString()
  comments: string;

}