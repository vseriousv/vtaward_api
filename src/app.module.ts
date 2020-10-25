import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { MailerModule } from '@nestjs-modules/mailer';
import { CommentsModule } from './comments/comments.module';
import { FeedbackFormModule } from './feedbackForm/feedbackForm.module';
import { ContentMainModule } from './ContentMain/contentMain.module';
import { NominationOrderModule } from './nomination-order/nomination-order.module';
import { FilesMiddleware } from './shared/middlewares/files-middleware';

import { NominationOrderController } from './nomination-order/nomination-order.controller';
import { MailModule } from './mail/mail.module';
import { UserVotingModule } from './user-voting/user-voting.module';

const config = new ConfigService();

@Module({
  imports: [
    UsersModule,
    NominationOrderModule,
    CommentsModule,
    SharedModule,
    // SectionsModule,
    // PositionsModule,
    StatesModule,
    // CityModule,
    NominationsModule,
    FeedbackFormModule,
    // ParticipantsModule,
    // VotesModule,
    // WinnersModule,
    // VotingsModule,
    FilesModule,
    // ContentMainModule,
    ConfigModule.forRoot(),
    MailerModule.forRoot({ ...config.transportConfig }),

    MailModule,

    UserVotingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FilesMiddleware)
      .forRoutes(NominationOrderController);
  }
}
