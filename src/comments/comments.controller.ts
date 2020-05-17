import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() createCommentDto: CreateCommentDto): Promise<CreateCommentDto> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [CommentDto] })
  findAll(): Promise<CommentDto[]> {
    return this.commentService.findAll();
  }

  // @Get('from/:user_id/voting/:voting_id')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [CommentDto] })
  // findFromAll(
  //   @Param('user_id') userId,
  //   @Param('voting_id') votingId,
  // ): Promise<CommentDto[]> {
  //   return this.commentService.findFromAll(userId, votingId);
  // }


  @Get(':id')
  @ApiParam({ name: 'id', description: 'id', type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  async getUser(@Param('id') id): Promise<CommentDto[]> {
    return this.commentService.findToById(id);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  update(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id') id,
  ): Promise<CommentDto> {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  delete(@Param('id') id): Promise<CommentDto> {
    return this.commentService.delete(id);
  }
}
