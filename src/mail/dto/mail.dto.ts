import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MailDto {
  @ApiProperty()
  @IsOptional()
  readonly userToId: number;

  @ApiProperty()
  @IsOptional()
  readonly userFromId: number;

  @ApiProperty()
  @IsOptional()
  readonly text: string;
}