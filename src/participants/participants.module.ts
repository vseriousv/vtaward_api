import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { participantsProviders } from './participants.provider';
import { DatabaseModule } from './../database/database.module';
import { ParticipantsService } from './participants.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ...participantsProviders],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
