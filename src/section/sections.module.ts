import { Module } from '@nestjs/common';
import {SectionsController} from './sections.controller';
import { sectionProviders} from './sections.provider';
import { DatabaseModule } from './../database/database.module';
import {SectionsService} from './sections.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [SectionsController],
  providers: [SectionsService, ...sectionProviders],
  exports: [SectionsService],
})
export class SectionsModule {}
