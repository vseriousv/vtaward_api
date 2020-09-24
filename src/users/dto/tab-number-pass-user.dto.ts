import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/enum/role';
import { ApiProperty } from '@nestjs/swagger';

export class TabNumberPassUserDto {
  @ApiProperty()
  @IsString()
  readonly tabNumber: string;
}
