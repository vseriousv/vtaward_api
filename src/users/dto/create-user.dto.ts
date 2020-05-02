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
    @IsOptional()
    @IsInt()
    readonly tab_number: number;

    @ApiProperty()
    @IsString()
    readonly name_ru: string;

    @ApiProperty()
    @IsString()
    readonly name_en: string;

    @ApiProperty()
    @IsString()
    readonly position_id: string;

    @ApiProperty()
    @IsString()
    readonly section_id: string;

    @ApiProperty()
    @IsString()
    readonly state_id: string;

    @ApiProperty()
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

}
