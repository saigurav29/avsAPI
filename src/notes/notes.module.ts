import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { notes } from './note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([notes])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
