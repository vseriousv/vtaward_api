import { Vote } from '../vote.entity';
import { ApiProperty } from '@nestjs/swagger';


export class VoteDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly user_from_id: number;

  @ApiProperty()
  readonly user_to_id: number;

  @ApiProperty()
  readonly type_voting: string;

  constructor(vote: Vote) {
    this.id = vote.id;
    this.user_from_id = vote.user_from_id;
    this.user_to_id = vote.user_to_id;
    this.type_voting = vote.type_voting;
  }
}
