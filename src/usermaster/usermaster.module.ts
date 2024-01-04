import { Module } from '@nestjs/common';
import { UserService } from './usermaster.service';
import { UserMasterController } from './usermaster.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usermaster } from './usermaster.entity';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([usermaster])],
  providers: [UserService,JwtStrategy],
  controllers: [UserMasterController],
  exports:[UserService]
})
export class UserModule {}
