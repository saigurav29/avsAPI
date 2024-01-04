import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { notes } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(notes) private notesRepository: Repository<notes>,
  ) {}
  async getNotes(): Promise<notes[]> {
    return await this.notesRepository.find();
  }

  findOne(id: string): Promise<notes> {
    return this.notesRepository.findOne(id);
  }

  async createNote(note: notes) {
    this.notesRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }

  async editNote(id: number, note: notes): Promise<notes> {
    const editedNote = await this.notesRepository.findOne(id);
    if (!editedNote) {
      throw new NotFoundException('Note is not found');
    }
    editedNote.description = note.description;
    editedNote.title = note.title;
    await editedNote.save();
    return editedNote;
  }
}
