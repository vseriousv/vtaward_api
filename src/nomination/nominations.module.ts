import { Module } from '@nestjs/common';
import {NominationsController} from './nominations.controller';
import { nominationProviders} from './nominations.provider';
import { DatabaseModule } from './../database/database.module';
import {NominationsService} from './nominations.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [NominationsController],
  providers: [NominationsService, ...nominationProviders],
  exports: [NominationsService],
})
export class NominationsModule {}
