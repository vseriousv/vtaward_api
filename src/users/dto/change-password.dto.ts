import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  readonly tabNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly passwordOld: string;

  @ApiProperty()
  @IsOptional()
  readonly passwordNew: string;
}
