import { Module } from '@nestjs/common';
import {VoteController} from './votes.controller';
import { voteProviders} from './votes.provider';
import { DatabaseModule } from './../database/database.module';
import {VoteService} from './votes.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [VoteController],
  providers: [VoteService, ...voteProviders],
  exports: [VoteService],
})
export class VotesModule {}
