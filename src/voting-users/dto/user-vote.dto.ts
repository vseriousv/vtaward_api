import { ApiProperty } from '@nestjs/swagger';
import { GiveVoteEntity } from '../give-vote.entity';

export class UserVoteDto {

  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly nominationOrderId: number;

  @ApiProperty()
  readonly range: number;

  constructor(giveVoteEntity: GiveVoteEntity) {
    this.id = giveVoteEntity.id;
    this.userId = giveVoteEntity.userId;
    this.nominationOrderId = giveVoteEntity.nominationOrderId;
    this.range = giveVoteEntity.range;
  }
}


