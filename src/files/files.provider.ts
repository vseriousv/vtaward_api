import { File } from './file.entity';

export const fileProviders = [
  { provide: 'FileRepository', useValue: File },
];
