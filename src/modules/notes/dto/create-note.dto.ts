import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
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
  @IsUrl({ each: true })
  images?: string[];
}
