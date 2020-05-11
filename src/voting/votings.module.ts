import { Module } from '@nestjs/common';
import { VotingsController } from './votings.controller';
import { votingsProviders } from './votings.provider';
import { DatabaseModule } from './../database/database.module';
import { VotingsService } from './votings.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [VotingsController],
  providers: [VotingsService, ...votingsProviders],
  exports: [VotingsService],
})
export class VotingsModule {}
