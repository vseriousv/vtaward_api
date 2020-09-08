import { HttpException, HttpStatus } from '@nestjs/common';

export const orderFileFilter = (req, file, cb) => {
  const allow = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'application/msword',
    'application/xml',
    'application/pdf',
  ];

  if (!allow.includes(file.mimetype)) {
    return cb(
      new HttpException(
        {
          status: 'error',
          message: 'Incorrect type of file, ' +
            'type must be: jpg, png, doc, xml, pdf',
        },
        HttpStatus.BAD_REQUEST,
      ),
      null,
    );
  }
  cb(null, true);
}
