import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsInt()
  nominationOrderId: number;

  @ApiProperty()
  @IsInt()
  userFromId: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
