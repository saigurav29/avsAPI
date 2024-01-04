import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, Max, MaxLength, Min, MinLength, minLength } from 'class-validator';

@Entity()
export class MaterialMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  @IsString()
  materialName: string;

  @Column()
  @IsString()
  materialType: string;

  @Column()
  @IsString()
  materialDes: string;
}