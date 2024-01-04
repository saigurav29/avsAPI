import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { usermaster } from './usermaster.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(usermaster) private userRepository: Repository<usermaster>,
  ) {}
  async getUser(): Promise<usermaster[]> {
    return await this.userRepository.find();
  }

  findOne(id: string): Promise<usermaster> {
    return this.userRepository.findOne({
      where:{UserName:id}
    });
  }

  async createUser(user: usermaster) {
    this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async editUser(id: number, user: usermaster): Promise<usermaster> {
    const edituser = await this.userRepository.findOne(id);
    if (!edituser) {
      throw new NotFoundException('User is not found');
    }
    edituser.lastloginIn = user.lastloginIn;
    edituser.loggedIn = user.loggedIn;
    edituser.token = user.token;
    await edituser.save();
    return edituser;
  }

  async saveorupdateRefreshToke(
    refreshToken:string,
    id:string, 
    lastloginIn){
   await this.userRepository.update(id,{token:refreshToken, lastloginIn});
 }
}
