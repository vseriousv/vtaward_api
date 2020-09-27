import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackFormDto {

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly text: string;
}