import { Participant } from '../participant.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { VotingDto } from '../../voting/dto/voting.dto';

export class ParticipantDto {
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

  constructor(participant: Participant) {
    this.id = participant.id;
    this.user_id = participant.user_id;
    this.voting_id = participant.voting_id;
    this.user = participant.user;
    this.voting = participant.voting;
  }
}
