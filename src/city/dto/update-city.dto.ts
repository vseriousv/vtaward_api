import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
// import { Role } from '../../shared/enum/role';

export class UpdateCityDto {

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly state_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly value_ru: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly value_en: string;

}