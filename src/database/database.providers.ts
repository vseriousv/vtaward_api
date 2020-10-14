import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { State } from '../state/state.entity';
import { Nomination } from '../nomination/nomination.entity';
import { ConfigService } from '../shared/config/config.service';
import { Participant } from '../participants/participant.entity';
import { Vote } from '../votes/vote.entity';
import { Winner } from '../winners/winner.entity';
import { Voting } from '../voting/voting.entity';
import { Comment } from '../comments/comment.entity';
import { FeedbackForm } from '../feedbackForm/feedbackForm.entity';
import { ContentMain } from '../ContentMain/contentMain.entity';
import { NominationOrderEntity } from '../nomination-order/entities/nomination-order.entity';
import { NominationOrderFilesEntity } from '../nomination-order/entities/nomination-order-files.entity';
import { GiveVoteEntity } from '../voting-users/give-vote.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([
        User,
        State,
        Nomination,
        Participant,
        Vote,
        Winner,
        Voting,
        Comment,
        FeedbackForm,
        ContentMain,
        NominationOrderEntity,
        NominationOrderFilesEntity,
        GiveVoteEntity,
      ]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
