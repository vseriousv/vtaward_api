import { extname } from 'path';

export const generateFilename = (req, file, cb) => {
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  return cb(null, `${randomName}${extname(file.originalname)}`);
};