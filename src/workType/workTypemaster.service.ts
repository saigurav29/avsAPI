import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { WorkTypeMaster } from './workTypemaster.entity';

@Injectable()
export class WorkTypeService {
  constructor(
    @InjectRepository(WorkTypeMaster) private worktypeRepository: Repository<WorkTypeMaster>,
  ) {}
  async getworktype(): Promise<WorkTypeMaster[]> {
    return await this.worktypeRepository.find();
  }

  findOne(id: string): Promise<WorkTypeMaster> {
    return this.worktypeRepository.findOne({
      where:{id:id}
    });
  }

  async createworktype(worktype: WorkTypeMaster) {
    this.worktypeRepository.save(worktype);
  }

  async remove(id: string): Promise<void> {
    await this.worktypeRepository.delete(id);
  }

  async editworktype(id: number, worktype: WorkTypeMaster): Promise<WorkTypeMaster> {
    const editworktype = await this.worktypeRepository.findOne({
        where:{id:id}
      });
    if (!editworktype) {
      throw new NotFoundException('worktype is not found');
    }
    editworktype.workType = worktype.workType;
    await editworktype.save();
    return editworktype;
  }

}
