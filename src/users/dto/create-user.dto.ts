import {
    IsString,
    IsEmail,
    IsInt,
    IsEnum,
    IsISO8601,
    IsOptional,
    MinLength,
} from 'class-validator';
// import { Gender } from './../../shared/enum/gender';
import  { Role } from '../../shared/enum/role';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly name_ru: string;

    @ApiProperty()
    @IsString()
    readonly name_en: string;

    @ApiProperty()
    @IsString()
    readonly position_ru: string;

    @ApiProperty()
    @IsString()
    readonly position_en: string;

    @ApiProperty()
    @IsString()
    readonly section_ru: string;

    @ApiProperty()
    @IsString()
    readonly section_en: string;

    @ApiProperty()
    @IsString()
    readonly state_ru: string;

    @ApiProperty()
    @IsString()
    readonly state_en: string;

    @ApiProperty()
    @IsString()
    readonly city_ru: string;

    @ApiProperty()
    @IsString()
    readonly city_en: string;

    @ApiProperty()
    @IsString()
    readonly nomination_ru: string;

    @ApiProperty()
    @IsString()
    readonly nomination_en: string;

    @ApiProperty()
    @IsString()
    readonly description_ru: string;

    @ApiProperty()
    @IsString()
    readonly description_en: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Role)
    readonly role: Role;

}
