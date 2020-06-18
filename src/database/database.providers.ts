import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Section } from '../section/section.entity';
import { Position } from '../position/position.entity';
import { City } from '../city/city.entity';
import { State } from '../state/state.entity';
import { Nomination } from '../nomination/nomination.entity';
import { ConfigService } from './../shared/config/config.service';
import { Participant } from '../participants/participant.entity';
import { Vote } from '../votes/vote.entity';
import { Winner } from '../winners/winner.entity';
import { Voting } from '../voting/voting.entity'
import { Comment } from '../comments/comment.entity';
import { FeedbackForm } from '../feedbackForm/feedbackForm.entity';
import { ContentMain } from '../ContentMain/contentMain.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      // @ts-ignore
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([
        User,
        Section,
        State,
        Position,
        City,
        Nomination,
        Participant,
        Vote,
        Winner,
        Voting,
        Comment,
        FeedbackForm,
        ContentMain,
      ]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
