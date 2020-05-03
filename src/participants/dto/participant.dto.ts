import { Participant } from '../participant.entity';
import { ApiProperty } from '@nestjs/swagger';


export class ParticipantDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  year_voting: number;

  @ApiProperty()
  type_voting: string;

  constructor(participant: Participant) {
    this.id = participant.id;
    this.user_id = participant.user_id;
    this.year_voting = participant.year_voting;
    this.type_voting = participant.type_voting;
  }
}