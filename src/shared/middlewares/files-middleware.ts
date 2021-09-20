import { Injectable, NestMiddleware } from '@nestjs/common';
import { generateFilename } from '../utils/generation-file-name';
import multer,{ diskStorage } from 'multer';
import { orderFileFilter } from '../utils/order-file-filter';
import config from '../../../config';

@Injectable()
export class FilesMiddleware implements NestMiddleware {
  private storage = diskStorage({
    destination: `${config.dirFiles}/nomination-orders`,
    filename: generateFilename,
  });
  private fileFilter = orderFileFilter;

  async use(req, res, next) {
    const upload = multer({
        storage: this.storage,
        fileFilter: this.fileFilter
      });

    await new Promise((resolve, reject) => {
      upload.array('files')(req, res, err => err ? reject(err) : resolve());
    });
    // console.log(req.files.map(file => file.filename));
    return next();
  }
}
