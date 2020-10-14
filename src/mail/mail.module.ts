import { Module } from '@nestjs/common';
import { MailController } from './controller/mail.controller';
import { MailService } from './service/mail.service';

@Module({
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
