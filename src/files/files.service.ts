import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { File } from './file.entity';
import { FilesDto } from './dto/files.dto';
import { CreatFilesDto } from './dto/creat-files.dto';
import { UpdateFilesDto } from './dto/update-files.dto';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: typeof File,
  ) {}

  async findAll() {
    const files = await this.fileRepository.findAll<File>({
      order: [['id', 'ASC']],
    });
    return files.map(file => new FilesDto(file));
  }


}
