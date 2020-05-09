import { Winner } from '../winner.entity';
import { ApiProperty } from '@nestjs/swagger';

export class WinnerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  year_voting: number;

  @ApiProperty()
  type_voting: string;

  constructor(winner: Winner) {
    this.id = winner.id;
    this.user_id = winner.user_id;
    this.year_voting = winner.year_voting;
    this.type_voting = winner.type_voting;
  }
}
