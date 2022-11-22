import { Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  // Service Variables
  private readonly logger = new Logger(NotesService.name);

  constructor(
    @InjectRepository(Note, 'notelink')
    private readonly notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<UpdateNoteDto> {
    return new Promise<UpdateNoteDto>(async (resolve, rejects) => {
      await this.notesRepository
        .save(createNoteDto)
        .then((noteCreated) => {
          this.logger.log(`Note created correctly: ${noteCreated}`);
          resolve(noteCreated);
        })
        .catch((error) => {
          this.logger.error('Error creating note:', error);
          rejects(error);
        });
    });
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
