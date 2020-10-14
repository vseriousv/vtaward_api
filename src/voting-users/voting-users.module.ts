import { Module } from '@nestjs/common';
import { VotingUsersController } from './voting-users.controller';
import { VotingUsersService } from './voting-users.service';
import { DatabaseModule } from '../database/database.module';
import { votingsUsersProviders } from 'src/voting-users/voting-users.provider';
import { UsersService } from 'src/users/users.service';
import { NominationOrderService } from 'src/nomination-order/services/nomination-order.service';
import { User } from 'src/users/user.entity';
import { ConfigService } from 'src/shared/config/config.service';
import { databaseProviders } from 'src/database/database.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [VotingUsersController],
  providers: [VotingUsersService, ...votingsUsersProviders, ...databaseProviders,  ConfigService, UsersService, User, NominationOrderService ]
})
export class VotingUsersModule {}
