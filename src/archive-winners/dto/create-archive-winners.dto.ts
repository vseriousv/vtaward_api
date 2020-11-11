import { IsString, IsInt, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArchiveWinnersDto {
    @ApiProperty() 
    @IsString()
    img: string;

    @ApiProperty() 
    @IsString()
    name: string;

    @ApiProperty() 
    @IsInt()
    year: number;

    @ApiProperty() 
    @IsString()
    position: string;

    @ApiProperty() 
    @IsString()
    city: string;
}