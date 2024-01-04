import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { StatusMaster } from './statusmaster.entity';
import { StatusService } from './statusmaster.service';
import { StatusMasterController } from './statusmaster.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StatusMaster])],
  providers: [StatusService,JwtStrategy],
  controllers: [StatusMasterController],
  exports:[StatusService]
})
export class StatusModule {}
