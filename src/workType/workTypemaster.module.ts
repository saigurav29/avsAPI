import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { WorkTypeMaster } from './workTypemaster.entity';
import { WorkTypeMasterController } from './workTypemaster.controller';
import { WorkTypeService } from './workTypemaster.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTypeMaster])],
  providers: [WorkTypeService,JwtStrategy],
  controllers: [WorkTypeMasterController],
  exports:[WorkTypeService]
})
export class WorkTypeModule {}
