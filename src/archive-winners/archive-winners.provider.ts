import { ArchiveWinnersEntity } from './archive-winners.entity';

export const archiveWinnersProvider = [
  { provide: 'ArchiveWinnersRepository', useValue: ArchiveWinnersEntity },
];