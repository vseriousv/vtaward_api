import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty()
  @IsInt()
  readonly user_id: number;

  @ApiProperty()
  @IsInt()
  readonly voting_id: number;
}
