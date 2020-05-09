import {
    IsString,
    IsEmail,
    IsInt,
    IsEnum,
    IsOptional,
} from 'class-validator';
import  { Role } from '../../shared/enum/role';
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
    readonly firstanme_ru: string;

    @ApiProperty()
    @IsString()
    readonly firstanme_en: string;

    @ApiProperty()
    @IsString()
    readonly lastname_ru: string;

    @ApiProperty()
    @IsString()
    readonly lastname_en: string;

    @ApiProperty()
    @IsString()
    readonly patronymic_ru: string;

    @ApiProperty()
    @IsString()
    readonly patronymic_en: string;

    @ApiProperty()
    @IsInt()
    readonly position_id: number;

    @ApiProperty()
    @IsInt()
    readonly section_id: number;

    @ApiProperty()
    @IsInt()
    readonly state_id: number;

    @ApiProperty()
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
}
