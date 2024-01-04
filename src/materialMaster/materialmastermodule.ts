import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { MaterialMasterController } from './materialmaster.controller';
import { MaterialService } from './materialmaster.service';
import { MaterialMaster } from './materialmaster.entity';
import { Flatmaterial } from '../entity/flatmaterial.entity';
import { sqlRawQueryService } from "../shared/service/sqlRawQuery.service";

@Module({
  imports: [TypeOrmModule.forFeature([MaterialMaster,Flatmaterial])],
  providers: [MaterialService,JwtStrategy,sqlRawQueryService],
  controllers: [MaterialMasterController],
  exports:[MaterialService,sqlRawQueryService]
})
export class MaterialModule {}
