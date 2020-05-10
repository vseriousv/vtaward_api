import { Vote } from '../vote.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';
import { UserDto } from '../../users/dto/user.dto';

export class VoteDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly user_from_id: number;

  @ApiProperty()
  readonly user_to_id: number;

  @ApiProperty()
  readonly type_vote: string;

  @ApiProperty()
  readonly count_vote: number;

  @ApiProperty()
  readonly voting_id: number;

  // @ApiProperty()
  // readonly userFrom: UserDto;

  @ApiProperty()
  readonly userTo: UserDto;

  constructor(vote: Vote) {
    this.id = vote.id;
    this.user_from_id = vote.user_from_id;
    this.user_to_id = vote.user_to_id;
    this.type_vote = vote.type_vote;
    this.count_vote = vote.count_vote;
    // this.userFrom = vote.userFrom;
    this.voting_id = vote.voting_id;
    this.userTo = vote.userTo;
  }
}
