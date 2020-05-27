import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StatusResponseDto {
  @ApiProperty()
  @IsString()
  readonly response?: string;

  @ApiProperty()
  @IsNumber()
  readonly status?: number;

  constructor(response?: string, status?: number) {
    this.response = response;
    this.status = status;
  }
}