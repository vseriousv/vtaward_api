import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { Comment } from '../comment.entity';
import { Column, CreatedAt } from 'sequelize-typescript';

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
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly userFrom: UserDto;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.user_from_id = comment.user_from_id;
    this.user_to_id = comment.user_to_id;
    this.comment = comment.comment;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.userFrom = new UserDto(comment.userFrom);
  }
}
