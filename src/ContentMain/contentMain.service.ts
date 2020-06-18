import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ContentMainDto } from './dto/contentMain.dto';
import { ContentMain } from './contentMain.entity';
import { CommentDto } from '../comments/dto/comment.dto';

@Injectable()
export class ContentMainService {
  constructor(
    @Inject('ContentMainRepository')
    private readonly contentMainRepository: typeof ContentMain,
  ) {}

  async findAll() {
     return this.contentMainRepository.findAll<ContentMain>();
  }

  async createOrUpdate(contentMainDto: ContentMainDto) {
    try {
      const data = await this.findAll();
      if(data.length === 0 ){
        const res = new ContentMain(contentMainDto)
        return await res.save();
      }

      return await data[0].update(contentMainDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
