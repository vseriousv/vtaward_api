import { State } from '../state.entity';
import { ApiProperty } from '@nestjs/swagger';

export class StateDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly value_ru: string;

  @ApiProperty()
  readonly value_en: string;

  constructor(state: State) {
    this.id = state.id;
    this.value_ru = state.value_ru;
    this.value_en = state.value_en;
  }
}
