import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsInt()
  user_from_id: number;

  @ApiProperty()
  @IsInt()
  user_to_id: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
