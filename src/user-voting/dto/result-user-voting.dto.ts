import { ApiProperty } from '@nestjs/swagger';
import { NominationOrderDto } from '../../nomination-order/dto/nomination-order.dto';

export class ResultUserVotingDto {

  @ApiProperty()
  nominationOrder: NominationOrderDto;

  @ApiProperty()
  sumVote: number;

  @ApiProperty()
  countVote: number;

  @ApiProperty()
  average: number;

  @ApiProperty()
  resultRange: number;

  constructor(
    nominationOrder: NominationOrderDto,
    sumVote: number,
    countVote: number,
    average: number,
    resultRange: number,
  ) {
    this.nominationOrder = nominationOrder;
    this.sumVote = sumVote;
    this.countVote = countVote;
    this.average = average;
    this.resultRange = resultRange;
  }
}