import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Citymaster } from './citymaster.entity';
import { CityService } from './citymaster.service';
import { CityMasterController } from './citymaster.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Citymaster])],
  providers: [CityService,JwtStrategy],
  controllers: [CityMasterController],
  exports:[CityService]
})
export class CityModule {}
