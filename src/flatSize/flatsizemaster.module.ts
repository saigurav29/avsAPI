import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { FlatSizeMaster } from './flatsizemaster.entity';
import { FlatSizeService } from './flatsizemaster.service';
import { FlatSizeMasterController } from './flatsizemaster.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FlatSizeMaster])],
  providers: [FlatSizeService,JwtStrategy],
  controllers: [FlatSizeMasterController],
  exports:[FlatSizeService]
})
export class FlatSizeModule {}
