import { Position } from '../position.entity';
import { ApiProperty } from '@nestjs/swagger';


export class PositionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly value_ru: string;

  @ApiProperty()
  readonly value_en: string;

  constructor(position: Position) {
    this.id = position.id;
    this.value_ru = position.value_ru;
    this.value_en = position.value_en;
  }
}
