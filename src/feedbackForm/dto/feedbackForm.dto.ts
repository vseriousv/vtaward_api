import { ApiProperty } from '@nestjs/swagger';
import { FeedbackForm } from '../feedbackForm.entity';

export class FeedbackFormDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  isActive: boolean;

  constructor(feedbackForm: FeedbackForm) {
    this.id = feedbackForm.id;
    this.name = feedbackForm.name;
    this.text = feedbackForm.text;
    this.isActive = feedbackForm.isActive;
  }
}