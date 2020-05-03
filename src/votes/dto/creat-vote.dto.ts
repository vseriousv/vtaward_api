import {
  IsString,
  IsInt
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteDto {

  @ApiProperty()
  @IsInt()
  user_from_id: number;

  @ApiProperty()
  @IsInt()
  user_to_id: number;

  @ApiProperty()
  @IsString()
  readonly type_voting: string;

}