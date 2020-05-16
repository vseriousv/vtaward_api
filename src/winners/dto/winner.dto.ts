import { Winner } from '../winner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { VotingDto } from '../../voting/dto/voting.dto';

export class WinnerDto {
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

  constructor(winner: Winner) {
    this.id = winner.id;
    this.user_id = winner.user_id;
    this.voting_id = winner.voting_id;
    this.user = winner.user;
    this.voting = winner.voting;
  }
}
