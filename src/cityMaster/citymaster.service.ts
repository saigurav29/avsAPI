import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { Citymaster } from './citymaster.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(Citymaster) private cityRepository: Repository<Citymaster>,
  ) {}
  async getCity(): Promise<Citymaster[]> {
    return await this.cityRepository.find();
  }

  findOne(id: string): Promise<Citymaster> {
    return this.cityRepository.findOne({
      where:{cityCode:id}
    });
  }

  async createCity(city: Citymaster) {
    this.cityRepository.save(city);
  }

  async remove(id: string): Promise<void> {
    await this.cityRepository.delete(id);
  }

  async editCity(id: number, city: Citymaster): Promise<Citymaster> {
    const editcity = await this.cityRepository.findOne({
        where:{cityCode:id}
      });
    if (!editcity) {
      throw new NotFoundException('City is not found');
    }
    editcity.cityName = city.cityName;
    await editcity.save();
    return editcity;
  }

}
