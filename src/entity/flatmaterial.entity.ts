import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsNumber, IsString, Max, MaxLength, Min, MinLength, isNumber, minLength } from 'class-validator';

@Entity()
export class Flatmaterial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  flatid: number;

  @Column()
  @IsNumber()
  materialId: number;

  @Column()
  @IsString()
  materialQty: string;

  @Column()
  @IsString()
  materialprice: string;

  @Column()
  @IsString()
  city: string;
  
  @Column()
  @IsString()
  desc: string;

}