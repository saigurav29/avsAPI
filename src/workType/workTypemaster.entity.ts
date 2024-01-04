import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class WorkTypeMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @IsString()
  workType:string;

}
