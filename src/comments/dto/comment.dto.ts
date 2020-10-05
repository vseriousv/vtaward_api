import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../comment.entity';
import { NominationOrderDto } from '../../nomination-order/dto/nomination-order.dto';

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly userFromId: number;

  @ApiProperty()
  readonly nominationOrderId: number;

  @ApiProperty()
  readonly comment: string;

  @ApiProperty()
  readonly public: boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly nominationOrder: NominationOrderDto;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.userFromId = comment.userFromId;
    this.nominationOrderId = comment.nominationOrderId;
    this.comment = comment.comment;
    this.public = comment.public;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.nominationOrder = new NominationOrderDto(comment.nominationOrder);
  }
}
