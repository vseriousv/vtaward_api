import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';

export class UpdateVoteDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly user_from_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly user_to_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly type_vote: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  count_vote: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  voting_id: number;
}
