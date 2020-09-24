import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginRequestDto {
  @ApiProperty()
  @IsString()
  readonly tabNumber: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

}
