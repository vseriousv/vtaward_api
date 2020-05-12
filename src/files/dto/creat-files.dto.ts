import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatFilesDto {
  @ApiProperty()
  @IsString()
  readonly file_name: string;

  @ApiProperty()
  @IsString()
  readonly file_type: string;

  @ApiProperty()
  @IsString()
  readonly file_src: string;
}
