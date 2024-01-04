import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, Max, MaxLength, Min, MinLength, minLength } from 'class-validator';

@Entity()
export class LabourMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  @IsString()
  labourName: string;

  @Column()
  @IsString()
  labourNumber: string;

  @Column()
  @MinLength(3)
  @IsString()
  labourAddress: string;

  @Column()
  @IsString()
  labourstatus: string;

}