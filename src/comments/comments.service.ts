import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    try {
      const { count, rows } = await this.commentRepository.findAndCountAll<Comment>({
        include: [NominationOrderEntity],
        order: [['id', 'ASC']],
      });
      return {
        count: rows.length,
        rows: rows.map(comment => new CommentDto(comment)),
      }
    } catch (e){
      throw new BadRequestException(e);
    }
  }

  async findById(id: number):Promise<CommentDto> {
    try {
      return this.commentRepository.findByPk<Comment>(id,{
        include: [{
          model: NominationOrderEntity
        }],
        order: [['id', 'ASC']],
      });
    } catch (e) {
      throw new BadRequestException(e)
    }

  }

  async findByNominationOrder(nominationOrderId: number) {
    try {
      const { count, rows } = await this.commentRepository.findAndCountAll<Comment>({
        include: [NominationOrderEntity],
        where: {
          nominationOrderId,
        },
        order: [['id', 'ASC']],
      });
      return {
        count: rows.length,
        rows: rows.map(comment => new CommentDto(comment)),
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findByNominationOrderOnlyPublic(nominationOrderId: number) {
    try {
      const { count, rows }  = await this.commentRepository.findAndCountAll<Comment>({
        include: [NominationOrderEntity],
        where: {
          nominationOrderId,
          public: true,
        },
        order: [['id', 'ASC']],
      });
      return {
        count: rows.length,
        rows: rows.map(comment => new CommentDto(comment)),
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }



  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = new Comment();

      comment.userFromId = createCommentDto.userFromId;
      comment.nominationOrderId = createCommentDto.nominationOrderId;
      comment.comment = createCommentDto.comment;

      await comment.save();

      return this.findById(comment.id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }



  async changeOneFiled(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentDto> {
    const comment = await this.commentRepository.findByPk<Comment>(id);
    if (!comment) {
      throw new HttpException('Comment not found.', HttpStatus.NOT_FOUND);
    }
    comment.userFromId = updateCommentDto.userFromId || comment.userFromId;
    comment.nominationOrderId = updateCommentDto.nominationOrderId || comment.nominationOrderId;
    comment.comment = updateCommentDto.comment || comment.comment;
    comment.public = updateCommentDto.public !== null ? updateCommentDto.public : comment.public;

    try {
      await comment.save();
      return this.findById(comment.id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async delete(id: string) {
    try {
      const comment = await this.commentRepository.findByPk<Comment>(id);
      await comment.destroy();
      return true;
    } catch (e){
      throw new BadRequestException(e);
    }
  }
}
