import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FeedbackFormController } from './feedbackForm.controller';
import { FeedbackFormService } from './feedbackForm.service';
import { feedbackFromProviders } from './feedbackForm.provider';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/service/mail.service';


@Module({
  imports: [DatabaseModule, UsersModule, MailModule],
  controllers: [FeedbackFormController],
  providers: [FeedbackFormService, ...feedbackFromProviders, MailService],
  exports: [FeedbackFormService],
})
export class FeedbackFormModule {}