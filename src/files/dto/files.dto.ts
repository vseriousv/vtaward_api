import { File } from '../file.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FilesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly file_name: string;

  @ApiProperty()
  readonly file_type: string;

  @ApiProperty()
  readonly file_src: string;

  constructor(file: File) {
    this.id = file.id;
    this.file_name = file.file_name;
    this.file_src = file.file_src;
  }
}
