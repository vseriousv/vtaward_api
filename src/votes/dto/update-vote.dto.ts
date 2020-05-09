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
  readonly type_voting: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  count_vote: number;
}
