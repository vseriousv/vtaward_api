import { Nomination } from '../nomination.entity';
import { ApiProperty } from '@nestjs/swagger';

export class NominationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly valueRu: string;

  @ApiProperty()
  readonly valueEn: string;

  constructor(nomination: Nomination) {
    this.id = nomination.id;
    this.valueRu = nomination.valueRu;
    this.valueEn = nomination.valueEn;
  }
}
