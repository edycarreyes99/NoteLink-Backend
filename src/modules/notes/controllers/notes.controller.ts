import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/decorators/user.decorator';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
@UseGuards(AuthenticatedGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(@User() user: DecodedIdToken) {
    return this.notesService.findAll(user.uid);
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
