import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  title: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  description: string;

  @IsArray()
  images?: string[];
}
