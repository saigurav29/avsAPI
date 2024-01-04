import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { FlatSizeMaster } from './flatsizemaster.entity';

@Injectable()
export class FlatSizeService {
  constructor(
    @InjectRepository(FlatSizeMaster) private flatsizeRepository: Repository<FlatSizeMaster>,
  ) {}
  async getflatsize(): Promise<FlatSizeMaster[]> {
    return await this.flatsizeRepository.find();
  }

  findOne(id: string): Promise<FlatSizeMaster> {
    return this.flatsizeRepository.findOne({
      where:{id:id}
    });
  }

  async createflatsize(flatsize: FlatSizeMaster) {
    this.flatsizeRepository.save(flatsize);
  }

  async remove(id: string): Promise<void> {
    await this.flatsizeRepository.delete(id);
  }

  async editflatsize(id: number, flatsize: FlatSizeMaster): Promise<FlatSizeMaster> {
    const editflatsize = await this.flatsizeRepository.findOne({
        where:{id:id}
      });
    if (!editflatsize) {
      throw new NotFoundException('flatsize is not found');
    }
    editflatsize.flatsizecode = flatsize.flatsizecode;
    editflatsize.flatsize = flatsize.flatsize;
    await editflatsize.save();
    return editflatsize;
  }

}
