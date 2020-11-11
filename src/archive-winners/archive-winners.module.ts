import { Module } from '@nestjs/common';
import { ArchiveWinnersService } from './archive-winners.service';
import { ArchiveWinnersController } from './archive-winners.controller';
import { archiveWinnersProvider } from './archive-winners.provider';

@Module({
  providers: [ArchiveWinnersService, ...archiveWinnersProvider],
  controllers: [ArchiveWinnersController]
})
export class ArchiveWinnersModule {}
