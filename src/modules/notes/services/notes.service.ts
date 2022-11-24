import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
          rejects(new InternalServerErrorException(error));
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
          rejects(new InternalServerErrorException(error));
        });
    });
  }

  async findOne(id: number): Promise<UpdateNoteDto> {
    return new Promise<UpdateNoteDto>(async (resolve, rejects) => {
      await this.notesRepository
        .findOne({
          where: {
            id: id,
            deleted_at: null,
          },
        })
        .then((note) => {
          if (note !== null) {
            this.logger.log(`Note found: ${JSON.stringify(note)}`);

            // Remove timestamps from the response object
            delete note.deleted_at;

            resolve(note);
          } else {
            rejects(new NotFoundException('The requested Note was not found'));
          }
        })
        .catch((error) => {
          this.logger.error('Error finding note:', error);
          rejects(new InternalServerErrorException(error));
        });
    });
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
  ): Promise<UpdateNoteDto> {
    return new Promise<UpdateNoteDto>(async (resolve, rejects) => {
      await this.findOne(id)
        .then(async (noteFound) => {
          // Create the object to update
          const noteToUpdate = new Note();
          noteToUpdate.id = noteFound.id;
          noteToUpdate.title = updateNoteDto.title;
          noteToUpdate.description = updateNoteDto.description;
          noteToUpdate.images = updateNoteDto.images ?? [];

          // Remove the timestamps from the object before updating
          delete (noteFound as Note).created_at;
          delete (noteFound as Note).updated_at;
          delete (noteFound as Note).deleted_at;

          // Merge the old object values with the new ones
          this.notesRepository.merge(noteFound as Note, noteToUpdate);

          // Save the updated object to the database
          await this.notesRepository
            .save(noteFound)
            .then((noteUpdated) => {
              this.logger.log(
                `Note updated correctly ${JSON.stringify(noteUpdated)}`,
              );

              resolve(noteUpdated);
            })
            .catch((error) => {
              this.logger.error('Error updating note:', error);
              rejects(new InternalServerErrorException(error));
            });
        })
        .catch((error) => {
          rejects(error);
        });
    });
  }

  async remove(id: number): Promise<UpdateNoteDto> {
    return new Promise<UpdateNoteDto>(async (resolve, rejects) => {
      await this.findOne(id)
        .then(async (noteFound) => {
          await this.notesRepository
            .softDelete(id)
            .then(() => {
              // Added the deleted_at timestamp to the response object
              (noteFound as Note).deleted_at = new Date();

              resolve(noteFound);
            })
            .catch((error) => {
              this.logger.error('Error deleting note:', error);
              rejects(new InternalServerErrorException(error));
            });
        })
        .catch((error) => {
          rejects(error);
        });
    });
  }
}
