import { Participant } from '../participant.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { VotingDto } from '../../voting/dto/voting.dto';

export class ParticipantWithVotesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  voting_id: number;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  voting: VotingDto;

  @ApiProperty()
  result: object;

  constructor(participant: Participant, result: object) {
    this.id = participant.id;
    this.user_id = participant.user_id;
    this.voting_id = participant.voting_id;
    this.user = participant.user;
    this.voting = participant.voting;
    this.result = result;
  }
}
