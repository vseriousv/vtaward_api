import { Module } from '@nestjs/common';
import { VotingUsersController } from './voting-users.controller';
import { VotingUsersService } from './voting-users.service';
import { DatabaseModule } from '../database/database.module';
import { votingUsersProviders } from 'src/voting-users/voting-users.provider';
import { UsersService } from 'src/users/users.service';
import { NominationOrderService } from 'src/nomination-order/services/nomination-order.service';
import { ConfigService } from 'src/shared/config/config.service';
import { databaseProviders } from 'src/database/database.providers';
import { MailService } from '../mail/service/mail.service';
import { nominationOrderProvider } from '../nomination-order/services/nomination-order.provider';


@Module({
  imports: [DatabaseModule],
  controllers: [VotingUsersController],
  providers: [
    VotingUsersService,
    ...votingUsersProviders,
    ...nominationOrderProvider,
    UsersService,
    NominationOrderService,
    ConfigService,
    MailService,
  ],
  exports: [VotingUsersService],
})
export class VotingUsersModule {
}
