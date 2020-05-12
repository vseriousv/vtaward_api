import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile, UseGuards, HttpException, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from 'path';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../files/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      }),
      fileFilter: (req, file, cb) => {
        const allow = ['image/jpeg', 'image/pjpeg', 'image/png'];

        if (!allow.includes(file.mimetype)) {
          return cb(
            new HttpException(
              {
                status: 'error',
                message: 'Incorrect type of file',
              },
              HttpStatus.BAD_REQUEST,
            ),
            null,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
