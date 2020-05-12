import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { SectionsModule } from './section/sections.module';
import { PositionsModule } from './position/positions.module';
import { StatesModule } from './state/states.module';
import { CityModule } from './city/city.module';
import { NominationsModule } from './nomination/nominations.module';
import { ParticipantsModule } from './participants/participants.module';
import { VotesModule } from './votes/votes.module';
import { WinnersModule } from './winners/winners.module';
import { VotingsModule } from './voting/votings.module'
import { ConfigService } from './shared/config/config.service';
import { FilesModule } from './files/files.module';
// import { MailerModule } from '@nestjs-modules/mailer';

// const config = new ConfigService();

@Module({
  imports: [
    UsersModule,
    SharedModule,
    SectionsModule,
    PositionsModule,
    StatesModule,
    CityModule,
    NominationsModule,
    ParticipantsModule,
    VotesModule,
    WinnersModule,
    VotingsModule,
    FilesModule,
    ConfigModule.forRoot(),
    // MailerModule.forRoot({ ...config.transportConfig }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
