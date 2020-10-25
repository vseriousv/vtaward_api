import { Module } from '@nestjs/common';
import { UserVotingController } from './user-voting.controller';
import { UserVotingService } from './user-voting.service';
import { userVotingProviders } from './user-votting.providers';
import { DatabaseModule } from '../database/database.module';
import { NominationOrderService } from '../nomination-order/nomination-order.service';
import { nominationOrderProvider } from '../nomination-order/nomination-order.provider';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { MailService } from '../mail/service/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserVotingController],
  providers: [
    UserVotingService,
    ...userVotingProviders,
    NominationOrderService,
    ...nominationOrderProvider,
    UsersService,
    ...usersProviders,
    MailService,
  ],
  exports: [UserVotingService]
})
export class UserVotingModule {}
