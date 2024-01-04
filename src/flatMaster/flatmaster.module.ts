import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { FlatMaster } from './flatmaster.entity';
import { FlatMasterService } from './flatmaster.service';
import { FlatMasterController } from './flatmaster.controller';
import { Flatworkitems } from '../entity/flatworkitem.entity';
import { Flatlaboursitems } from '../entity/flatlabour.entity';
import { LabourMaster } from '../labourMaster/labourmaster.entity';
import { WorkTypeMaster } from '../workType/workTypemaster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlatMaster,Flatworkitems,Flatlaboursitems,LabourMaster,WorkTypeMaster])],
  providers: [FlatMasterService,JwtStrategy],
  controllers: [FlatMasterController],
  exports:[FlatMasterService]
})
export class FlatModule {}
