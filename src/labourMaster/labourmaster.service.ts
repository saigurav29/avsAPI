import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { LabourMaster } from './labourmaster.entity';

@Injectable()
export class LabourService {
  private readonly logger =  new Logger(LabourService.name); 

  constructor(
    @InjectRepository(LabourMaster) private LabourRepository: Repository<LabourMaster>,
  ) {}
  async getLabour(): Promise<LabourMaster[]> {
    return await this.LabourRepository.find();
  }

  findOne(id: string): Promise<LabourMaster> {
    return this.LabourRepository.findOne({
      where:{id:id}
    });
  }

  async createLabour(Labour: LabourMaster) {
    const exists = await this.LabourRepository.findOne({
      where:{labourNumber:Labour.labourNumber}
    });
    if(exists){
      this.logger.error("Labour Number already exists");
      throw new InternalServerErrorException("Number already exists");
    }
    const resultset = await this.LabourRepository.save(Labour);
    if(resultset){
      let resultMessage= "Labour added Successfully";
      return {
        id:resultset.id,
        message:resultMessage
      }
    }else{
      this.logger.error("Error happened while adding labour");
      throw new InternalServerErrorException("Error happened while adding labour");
     }
    
  }

  async remove(id: string): Promise<void> {
    await this.LabourRepository.delete(id);
  }

  async editLabour(id: number, Labour: LabourMaster) {
    const editLabour = await this.LabourRepository.findOne({
        where:{id:id}
      });
    if (!editLabour) {
      throw new NotFoundException('Labour is not found');
    }
    editLabour.labourName = Labour.labourName;
    editLabour.labourAddress = Labour.labourAddress;
    editLabour.labourNumber = Labour.labourNumber;
    editLabour.labourstatus = Labour.labourstatus;
    const resultset = await editLabour.save();
    if(resultset){
      let resultMessage= "Labour Upadted Successfully";
      return {
        id:resultset.id,
        message:resultMessage,
        data:resultset
      }
    }else{
      this.logger.error("Error happened while adding labour");
      throw new InternalServerErrorException("Error happened while adding labour");
     }
  }

}
