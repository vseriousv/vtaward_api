import { Section } from '../section.entity';
import { ApiProperty } from '@nestjs/swagger';


export class SectionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly value_ru: string;

  @ApiProperty()
  readonly value_en: string;

  constructor(section: Section) {
    this.id = section.id;
    this.value_ru = section.value_ru;
    this.value_en = section.value_en;
  }
}
