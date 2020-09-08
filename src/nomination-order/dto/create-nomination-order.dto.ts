import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNominationOrderDto {
  @ApiProperty()
  @IsInt()
  readonly userId: number;

  @ApiProperty()
  @IsInt()
  readonly nominationId: number;

  @ApiProperty()
  @IsString()
  readonly textRu: string;

  @ApiProperty()
  @IsString()
  readonly textEn: string;
}