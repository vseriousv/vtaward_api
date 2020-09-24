import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MailDto {
  @ApiProperty()
  @IsOptional()
  readonly userToEmail: string;

  @ApiProperty()
  @IsOptional()
  readonly userFromEmail: string;

  @ApiProperty()
  @IsOptional()
  readonly text: string;
}