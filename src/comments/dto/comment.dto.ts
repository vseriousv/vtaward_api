import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { Comment } from '../comment.entity';

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly user_from_id: number;

  @ApiProperty()
  readonly user_to_id: number;

  @ApiProperty()
  readonly comment: string;

  @ApiProperty()
  readonly userFrom: UserDto;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.user_from_id = comment.user_from_id;
    this.user_to_id = comment.user_to_id;
    this.comment = comment.comment;
    this.userFrom = comment.userFrom;
  }
}
