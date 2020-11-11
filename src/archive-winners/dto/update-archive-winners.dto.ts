import { IsString, IsInt, IsOptional, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArchiveWinnersDto {
    @ApiProperty()
    @IsOptional() 
    @IsString()
    img?: string;

    @ApiProperty()
    @IsOptional() 
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional() 
    @IsInt()
    year?: number;

    @ApiProperty() 
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty() 
    @IsOptional()
    @IsString()
    city?: string;
}