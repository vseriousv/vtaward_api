import { Voting } from '../voting.entity';
import { ApiProperty } from '@nestjs/swagger';

export class VotingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly year: number;

  @ApiProperty()
  readonly type_voting: string;

  @ApiProperty()
  readonly is_active: boolean;

  constructor(voting: Voting) {
    this.id = voting.id;
    this.year = voting.year;
    this.type_voting = voting.type_voting;
    this.is_active = voting.is_active;
  }
}
