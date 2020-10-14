import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserVoteDto {
 
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly user_id: number;

  @ApiProperty()
  readonly nomination_order_id: number;

  @ApiProperty()
  readonly create_at: Date;

  @ApiProperty()
  readonly update_at: Date;

  @ApiProperty()
  readonly range: number;

  constructor(userVoteDto: UserVoteDto) {
    this.id = userVoteDto.id;
    this.user_id = userVoteDto.user_id;
    this.nomination_order_id = userVoteDto.nomination_order_id;
    this.create_at = userVoteDto.create_at;
    this.update_at = userVoteDto.update_at;
    this.range = userVoteDto.range;
  }
}


