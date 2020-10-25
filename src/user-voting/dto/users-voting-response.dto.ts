import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { NominationOrderDto } from '../../nomination-order/dto/nomination-order.dto';
import { UserVotingEntity } from '../entities/user-voting.entity';
import { UsersVotingDto } from './users-voting.dto';

export class UsersVotingResponseDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  rows: UsersVotingDto[];
}