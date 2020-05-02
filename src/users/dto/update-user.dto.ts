import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
import { Role } from '../../shared/enum/role';

export class UpdateUserDto {

    @ApiProperty()
    @IsOptional()
    @IsInt()
    readonly tab_number: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly name_ru: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly name_en: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly position_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly section_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly state_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly city_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
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
