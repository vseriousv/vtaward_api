import { Module } from '@nestjs/common';
import {WinnersController} from './winners.controller';
import { winnerProviders} from './winners.provider';
import { DatabaseModule } from './../database/database.module';
import {WinnersService} from './winners.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [WinnersController],
  providers: [WinnersService, ...winnerProviders],
  exports: [WinnersService],
})
export class WinnersModule {}
