import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty()
  @IsString()
  readonly value_ru: string;

  @ApiProperty()
  @IsString()
  readonly value_en: string;

  @ApiProperty()
  @IsString()
  readonly code: string;
}
