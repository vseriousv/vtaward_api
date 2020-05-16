import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';

export class UpdateWinnerDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly user_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly voting_id: number;
}
