import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';

export class UpdateCommentDto {
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
  readonly comment: string;
}
