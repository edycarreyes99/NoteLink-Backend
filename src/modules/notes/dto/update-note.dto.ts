import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsDefined()
  @IsNotEmpty()
  id: number;
}
