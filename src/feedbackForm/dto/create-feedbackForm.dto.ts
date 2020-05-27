import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackFormDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly text: string;
}