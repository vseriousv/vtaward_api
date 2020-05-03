import { Module } from '@nestjs/common';
import {StatesController} from './states.controller';
import { stateProviders} from './states.provider';
import { DatabaseModule } from './../database/database.module';
import {StatesService} from './states.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [StatesController],
  providers: [StatesService, ...stateProviders],
  exports: [StatesService],
})
export class StatesModule {}
