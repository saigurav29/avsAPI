import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { UserModule } from './usermaster/usermaster.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { CityModule } from './cityMaster/citymaster.module';
import { StatusModule } from './statusmaster/statusmaster.module';
import { LabourModule } from './labourMaster/labourmastermodule';
import { FlatSizeModule } from './flatSize/flatsizemaster.module';
import { WorkTypeModule } from './workType/workTypemaster.module';
import { FlatModule } from './flatMaster/flatmaster.module';
import { MaterialModule } from './materialMaster/materialmastermodule';

@Module({
  imports: [
    AuthModule,
    HttpModule,
    TypeOrmModule.forRoot(),
    NotesModule,
    UserModule,
    CityModule,
    StatusModule,
    LabourModule,
    FlatSizeModule,
    WorkTypeModule,
    FlatModule,
    MaterialModule
  ],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
