// import { Gender } from './../../shared/enum/gender';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsISO8601, IsInt } from 'class-validator';
import { Role } from '../../shared/enum/role';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly name_ru?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly name_en?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly position_ru: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly position_en: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly section_ru: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly section_en: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly state_ru: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly state_en: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly city_ru: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly city_en: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly nomination_ru: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly nomination_en: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    readonly count_z: string;

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
