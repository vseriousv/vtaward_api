import { ApiProperty } from '@nestjs/swagger';
import { FeedbackForm } from '../feedbackForm.entity';

export class FeedbackFormDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  isActive: boolean;

  constructor(feedbackForm: FeedbackForm) {
    this.id = feedbackForm.id;
    this.userId = feedbackForm.userId;
    this.text = feedbackForm.text;
    this.isActive = feedbackForm.isActive;
  }
}