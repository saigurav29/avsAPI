import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { notes } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.getNotes();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.notesService.findOne(id);
  }

  @Post() create(@Body() note: notes) {
    return this.notesService.createNote(note);
  }

  @Patch(':id')
  async editNote(@Body() note: notes, @Param('id') id: number): Promise<notes> {
    const noteEdited = await this.notesService.editNote(id, note);
    return noteEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.notesService.remove(id);
  }
}
