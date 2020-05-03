import {
  IsString,
  IsInt
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {

  @ApiProperty()
  @IsInt()
  readonly user_id: number;

  @ApiProperty()
  @IsInt()
  readonly year_voting: number;

  @ApiProperty()
  @IsString()
  readonly type_voting: string;

}