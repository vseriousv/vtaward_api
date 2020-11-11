import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, } from 'class-validator';
import { ArchiveWinnersEntity } from '../archive-winners.entity';

export class ArchiveWinnersDto {
    @ApiProperty() 
    @IsString()
    id: number;

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

  constructor(archiveWinners: ArchiveWinnersEntity) {
    this.id = archiveWinners.id;
    this.img = archiveWinners.img;
    this.name = archiveWinners.name;
    this.year = archiveWinners.year;
    this.position = archiveWinners.position;
    this.city = archiveWinners.city;
  }
}
