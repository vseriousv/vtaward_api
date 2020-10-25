import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NominationOrderController } from './nomination-order.controller';
import { NominationOrderService } from './nomination-order.service';
import { nominationOrderProvider } from './nomination-order.provider';
import { UserVotingService } from '../user-voting/user-voting.service';
import { userVotingProviders } from '../user-voting/user-votting.providers';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { MailService } from '../mail/service/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NominationOrderController],
  providers: [
    NominationOrderService,
    ...nominationOrderProvider,
    UserVotingService,
    ...userVotingProviders,
    UsersService,
    ...usersProviders,
    MailService,
  ],
  exports: [NominationOrderService],
})
export class NominationOrderModule {}
