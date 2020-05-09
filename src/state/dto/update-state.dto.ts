import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
// import { Role } from '../../shared/enum/role';

export class UpdateStateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly value_ru: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly value_en: string;
}
