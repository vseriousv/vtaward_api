import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {

  @ApiProperty()
  @IsString()
  readonly value_ru: string;

  @ApiProperty()
  @IsString()
  readonly value_en: string;
}
