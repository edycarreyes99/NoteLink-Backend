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
          this.logger.log(
            `Note created correctly: ${JSON.stringify(noteCreated)}`,
          );

          // Remove timestamps from the response object
          delete noteCreated.deleted_at;

          resolve(noteCreated);
        })
        .catch((error) => {
          this.logger.error('Error creating note:', error);
          rejects(error);
        });
    });
  }

  async findAll(): Promise<UpdateNoteDto[]> {
    return new Promise<UpdateNoteDto[]>(async (resolve, rejects) => {
      await this.notesRepository
        .find({
          where: {
            deleted_at: null,
          },
          order: {
            created_at: 'DESC',
          },
        })
        .then((notes) => {
          this.logger.log(`Notes found: ${JSON.stringify(notes)}`);

          // Remove timestamps from the response object
          notes.forEach((note) => {
            delete note.deleted_at;
          });

          resolve(notes);
        })
        .catch((error) => {
          this.logger.error('Error finding notes:', error);
          rejects(error);
        });
    });
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
