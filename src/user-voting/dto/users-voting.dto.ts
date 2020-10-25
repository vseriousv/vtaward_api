import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { NominationOrderDto } from '../../nomination-order/dto/nomination-order.dto';
import { UserVotingEntity } from '../entities/user-voting.entity';
import { UserVotingType } from '../../shared/enum/user-voting-type';

export class UsersVotingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userFromId: number;

  @ApiProperty()
  nominationOrderId: number;

  @ApiProperty()
  range: number;

  @ApiProperty()
  type: UserVotingType;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  nominationOrder: NominationOrderDto;

  constructor(userVoting: UserVotingEntity) {
    this.id = userVoting.id;
    this.userFromId = userVoting.userFromId;
    this.nominationOrderId = userVoting.nominationOrderId;
    this.range = userVoting.range;
    this.type = userVoting.type;
    this.nominationOrder = userVoting.nominationOrder;
  }
}