import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { NominationOrderDto } from '../../nomination-order/dto/nomination-order.dto';
import { UserVotingEntity } from '../entities/user-voting.entity';
import { UserVotingType } from '../../shared/enum/user-voting-type';

export class CreateUsersVotingDto {
  @ApiProperty()
  nominationOrderId: number;

  @ApiProperty({
    description: 'Передать можно только числа 1, 2, 3'
  })
  range: number;

  @ApiProperty({
    enum: UserVotingType,
  })
  type: UserVotingType;
}