import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    if (!createNoteDto) {
      throw new BadRequestException('Please provide a valid note');
    }

    // Validate if the name of the note is not null and not empty and if it is longer than 3 characters
    if (!createNoteDto.name || createNoteDto.name.trim() === '') {
      return new BadRequestException('Name is required');
    } else if (createNoteDto.name.trim().length < 3) {
      return new BadRequestException('Name must be at least 3 characters long');
    }

    // Validate if the description of the note is not null and not empty and if it is longer than 3 characters
    if (!createNoteDto.description || createNoteDto.description.trim() === '') {
      return new BadRequestException('Description is required');
    } else if (createNoteDto.description.trim().length < 3) {
      return new BadRequestException(
        'Description must be at least 3 characters long',
      );
    }

    // Validate if the images array is null to initialize it as an empty array
    if (!createNoteDto.images) {
      createNoteDto.images = [];
    }

    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
