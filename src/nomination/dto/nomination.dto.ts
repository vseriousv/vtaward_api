import { Nomination } from '../nomination.entity';
import { ApiProperty } from '@nestjs/swagger';

export class NominationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly value_ru: string;

  @ApiProperty()
  readonly value_en: string;

  constructor(nomination: Nomination) {
    this.id = nomination.id;
    this.value_ru = nomination.value_ru;
    this.value_en = nomination.value_en;
  }
}
