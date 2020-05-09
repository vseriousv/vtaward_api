import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty()
  @IsInt()
  state_id: number;

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
