import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LabourMaster } from './labourmaster.entity';
import { LabourService } from './labourmaster.service';
import { LabourMasterController } from './labourmaster.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LabourMaster])],
  providers: [LabourService,JwtStrategy],
  controllers: [LabourMasterController],
  exports:[LabourService]
})
export class LabourModule {}
