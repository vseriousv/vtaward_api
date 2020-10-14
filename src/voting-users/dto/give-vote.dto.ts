import { ApiProperty } from '@nestjs/swagger';

export class GiveVoteDto {
  @ApiProperty()
  readonly nominationOrderId: number;

  @ApiProperty()
  readonly range: number;

}
