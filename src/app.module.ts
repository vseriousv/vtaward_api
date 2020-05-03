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
import { VotesModule} from './votes/votes.module';
import { WinnersModule } from './winners/winners.module';

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
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
