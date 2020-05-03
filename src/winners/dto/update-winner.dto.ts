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
  readonly year_voting: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly type_voting: string;

}
