import { IsString, IsEmail, IsInt, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../shared/enum/role';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'sequelize-typescript';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly tab_number: string;

  @ApiProperty()
  @IsString()
  readonly firstname_ru: string;

  @ApiProperty()
  @IsString()
  readonly firstname_en: string;

  @ApiProperty()
  @IsString()
  readonly lastname_ru: string;

  @ApiProperty()
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
  @IsString()
  readonly position_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly section_id: string;

  @ApiProperty()
  @IsString()
  readonly state_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly city_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly nomination_id: string;

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
