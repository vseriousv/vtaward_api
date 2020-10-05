import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { NominationOrderEntity } from '../nomination-order/entities/nomination-order.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('CommentRepository')
    private readonly commentRepository: typeof Comment,
  ) {}

  async findAll() {
    const comments = await this.commentRepository.findAll<Comment>({
      include: [NominationOrderEntity],
      order: [['id', 'ASC']],
    });
    return comments.map(comment => new CommentDto(comment));
  }

  async findById(id: number) {
    const comments = await this.commentRepository.findAll<Comment>({
      include: [NominationOrderEntity],
      where: {
        id,
      },
      order: [['id', 'ASC']],
    });
    return comments.map(comment => new CommentDto(comment));
  }

  async findByNominationOrder(nominationOrderId: number) {
    const comments = await this.commentRepository.findAll<Comment>({
      include: [NominationOrderEntity],
      where: {
        nominationOrderId,
      },
      order: [['id', 'ASC']],
    });
    return comments.map(comment => new CommentDto(comment));
  }



  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = new Comment();

      comment.userFromId = createCommentDto.userFromId;
      comment.nominationOrderId = createCommentDto.nominationOrderId;
      comment.comment = createCommentDto.comment;

      const commentsData = await comment.save();

      return this.findByNominationOrder(comment.nominationOrderId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async changeOneFiled(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findByPk<Comment>(id);
    if (!comment) {
      throw new HttpException('Comment not found.', HttpStatus.NOT_FOUND);
    }
    comment.userFromId = updateCommentDto.userFromId || comment.userFromId;
    comment.nominationOrderId = updateCommentDto.nominationOrderId || comment.nominationOrderId;
    comment.comment = updateCommentDto.comment || comment.comment;
    comment.public = updateCommentDto.public !== null ? updateCommentDto.public : comment.public;

    try {
      const data = await comment.save();
      return new CommentDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async delete(id: string) {
    const comment = await this.commentRepository.findByPk<Comment>(id);
    await comment.destroy();
    return new CommentDto(comment);
  }
}
