import { Module } from '@nestjs/common';
import { MailController } from './controller/mail.controller';
import { MailService } from './service/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://vtaward@vost-tech.ru:dfjk3WDS@mailsecurity.vost-tech.ru',
    })
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
