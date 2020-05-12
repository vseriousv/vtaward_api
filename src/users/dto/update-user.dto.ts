import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, IsEmail } from 'class-validator';
import { Role } from '../../shared/enum/role';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly tab_number: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstname_ru: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstname_en: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastname_ru: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastname_en: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly patronymic_ru: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly patronymic_en: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly position_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly section_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly state_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly city_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly nomination_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly count_z: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description_ru: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description_en: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly img: string;
}
