import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  description: string;

  @IsArray()
  images?: string[];
}
