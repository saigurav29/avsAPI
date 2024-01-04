import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class FlatMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  clientName: string;

  @Column()
  @IsString()
  clientNumber: string;

  @Column()
  @IsString()
  clientEmail: string;

  @Column()
  @IsString()
  clientAddress: string;

  @Column()
  @IsString()
  flatNo: string;
  @Column()
  @IsString()
  city: string;

  @Column()
  @IsString()
  startDate: Date;

  @Column()
  @IsString()
  ecompleteDate: Date;

  @Column()
  @IsString()
  acompleteDate: Date;

  
  @Column()
  @IsString()
  status: string;

  @Column()
  @IsString()
  flatsize: string;

  @Column()
  @IsString()
  workerRequired: string;

  @Column()
  @IsString()
  labours: string;
}
