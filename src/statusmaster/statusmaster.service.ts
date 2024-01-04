import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { StatusMaster } from './statusmaster.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(StatusMaster) private statusRepository: Repository<StatusMaster>,
  ) {}
  async getStatus(): Promise<StatusMaster[]> {
    return await this.statusRepository.find();
  }

  findOne(id: string): Promise<StatusMaster> {
    return this.statusRepository.findOne({
      where:{id:id}
    });
  }

  async createStatus(status: StatusMaster) {
    this.statusRepository.save(status);
  }

  async remove(id: string): Promise<void> {
    await this.statusRepository.delete(id);
  }

  async editStatus(id: number, status: StatusMaster): Promise<StatusMaster> {
    const editstatus = await this.statusRepository.findOne({
        where:{id:id}
      });
    if (!editstatus) {
      throw new NotFoundException('Status is not found');
    }
    editstatus.statusname = status.statusname;
    await editstatus.save();
    return editstatus;
  }

}
