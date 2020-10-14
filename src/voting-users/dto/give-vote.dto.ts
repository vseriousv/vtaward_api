import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GiveVoteDto {
  @ApiProperty()
  readonly nominationOrderId: number;

  @ApiProperty()
  readonly range: number;
  
}
