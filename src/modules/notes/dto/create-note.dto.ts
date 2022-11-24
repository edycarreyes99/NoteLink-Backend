import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  images?: string[];

  @ApiProperty()
  color?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  user_uid: string;
}
