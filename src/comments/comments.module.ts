import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { commentProviders } from './comments.provider';
import { DatabaseModule } from './../database/database.module';
import { CommentService } from './comments.service';
// import {JwtStrategy} from '../users/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders],
  exports: [CommentService],
})
export class CommentsModule {}
