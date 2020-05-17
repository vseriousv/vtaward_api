import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class ForgotPasswordRequestDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  readonly id?: number;

}
