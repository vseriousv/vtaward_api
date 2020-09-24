import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNominationDto {
  @ApiProperty()
  @IsString()
  readonly valueRu: string;

  @ApiProperty()
  @IsString()
  readonly valueEn: string;
}
