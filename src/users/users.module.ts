import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import { MailService } from '../mail/service/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    MailService,
    JwtStrategy,
  ],
  exports: [UsersService],
})
export class UsersModule {
}
