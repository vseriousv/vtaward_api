import { Module } from '@nestjs/common';
import { DatabaseModule } from './../database/database.module';
import { FeedbackFormController } from './feedbackForm.controller';
import { FeedbackFormService } from './feedbackForm.service';
import { feedbackFromProviders } from './feedbackForm.provider';


@Module({
  imports: [DatabaseModule],
  controllers: [FeedbackFormController],
  providers: [FeedbackFormService, ...feedbackFromProviders],
  exports: [FeedbackFormService],
})
export class FeedbackFormModule {}