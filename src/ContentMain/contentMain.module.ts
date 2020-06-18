import { Module } from '@nestjs/common';
import { DatabaseModule } from './../database/database.module';
import { contentMainProviders } from './contentMain.provider';
import { ContentMainController } from './contentMain.controller';
import { ContentMainService } from './contentMain.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContentMainController],
  providers: [ContentMainService, ...contentMainProviders],
  exports: [ContentMainService],
})
export class ContentMainModule {}
