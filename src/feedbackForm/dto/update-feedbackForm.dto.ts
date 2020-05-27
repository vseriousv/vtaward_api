import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeedbackFormDto {
  @ApiProperty()
  readonly isActive: boolean;
}