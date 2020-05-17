import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('CommentRepository')
    private readonly commentRepository: typeof Comment,
  ) {}

  async findAll() {
    const comments = await this.commentRepository.findAll<Comment>({
      include: [User],
      order: [['id', 'ASC']],
    });
    return comments.map(comment => new CommentDto(comment));
  }

  async findToById(userId: number) {
    const comments = await this.commentRepository.findAll<Comment>({
      include: [User],
      where: {
        user_to_id: userId,
      },
      order: [['id', 'ASC']],
    });
    return comments.map(comment => new CommentDto(comment));
  }
  //
  // async findByUserIdTo(users:number[], votings:number[]) {
  //   const comments = await this.commentRepository.findAll<Comment>({
  //     include: [User],
  //     where:{
  //       'user_to_id': users,
  //       'voting_id': votings
  //     },
  //     order: [['id', 'ASC']],
  //   });
  //   return comments.map(comment => new CommentDto(comment));
  // }
  //
  // async getComment(id: string) {
  //   const comment = await this.commentRepository.findByPk<Comment>(id);
  //   if (!comment) {
  //     throw new HttpException(
  //       'Comment with given id not found',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return new CommentDto(comment);
  // }

  // async getCommentFromId(from: string) {
  //   const comments = await this.commentRepository.findAll<Comment>({
  //     where:{
  //       'user_from_id': from,
  //     },
  //     order: [['id', 'ASC']],
  //   });
  //   return comments.map(comment => new CommentDto(comment));
  // }
  //
  // async getCommentToId(id: string) {
  //   const comment = await this.commentRepository.findByPk<Comment>(id);
  //   if (!comment) {
  //     throw new HttpException(
  //       'Comment with given id not found',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return new CommentDto(comment);
  // }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = new Comment();

      comment.user_from_id = createCommentDto.user_from_id;
      comment.user_to_id = createCommentDto.user_to_id;
      comment.comment = createCommentDto.comment;

      const commentsData = await comment.save();

      return new CommentDto(commentsData);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findByPk<Comment>(id);
    if (!comment) {
      throw new HttpException('Comment not found.', HttpStatus.NOT_FOUND);
    }
    comment.user_from_id = updateCommentDto.user_from_id || comment.user_from_id;
    comment.user_to_id = updateCommentDto.user_to_id || comment.user_to_id;
    comment.comment = updateCommentDto.comment || comment.comment;

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
