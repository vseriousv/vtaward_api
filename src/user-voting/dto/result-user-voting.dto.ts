import { ApiProperty } from '@nestjs/swagger';
import { NominationOrderDto } from '../../nomination-order/dto/nomination-order.dto';

export class ResultUserVotingDto {

  @ApiProperty()
  nominationOrderId: number;

  @ApiProperty()
  firstnameEn: string;

  @ApiProperty()
  firstnameRu: string;

  @ApiProperty()
  lastnameEn: string;

  @ApiProperty()
  lastnameRu: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  sumVote: number;

  @ApiProperty()
  countVote: number;

  @ApiProperty()
  average: number;

  @ApiProperty()
  resultRange: number;

  constructor(
    nominationOrderId: number,
    firstnameEn: string,
    firstnameRu: string,
    lastnameEn: string,
    lastnameRu: string,
    img: string,
    sumVote: number,
    countVote: number,
    average: number,
    resultRange: number,
  ) {
    this.nominationOrderId = nominationOrderId;
    this.firstnameEn = firstnameEn;
    this.firstnameRu = firstnameRu;
    this.lastnameEn = lastnameEn;
    this.lastnameRu = lastnameRu;
    this.img = img;
    this.sumVote = sumVote;
    this.countVote = countVote;
    this.average = average;
    this.resultRange = resultRange;
  }
}