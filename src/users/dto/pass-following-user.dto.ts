import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/enum/role';
import { ApiProperty } from '@nestjs/swagger';

export class PassFollowingUserDto {
  @ApiProperty()
  @IsString()
  readonly adminPass: string;

  @ApiProperty()
  @IsInt()
  readonly start: number;

  @ApiProperty()
  @IsInt()
  readonly end: number;
}
