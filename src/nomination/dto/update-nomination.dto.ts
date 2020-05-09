import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
// import { Role } from '../../shared/enum/role';

export class UpdateNominationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly value_ru: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly value_en: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly code: string;
}
