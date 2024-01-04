import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class Citymaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5 })
  @MinLength(1)
  @MaxLength(5)
  @IsString()
  cityCode: string;

  @Column({ length: 100 })
  @IsString()
  cityName: string;
}
