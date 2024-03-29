import { City } from '../city.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly value_ru: string;

  @ApiProperty()
  readonly value_en: string;

  constructor(city: City) {
    this.id = city.id;
    this.value_ru = city.value_ru;
    this.value_en = city.value_en;
  }
}