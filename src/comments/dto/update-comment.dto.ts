import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, IsBoolean } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly userFromId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly nominationOrderId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly comment: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly public: boolean;
}
