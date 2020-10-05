import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
  Param, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiParam, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Данный метод создает новый коментарий',
    summary: 'Создать комментарий',
  })
  @UseGuards(AuthGuard('jwt'))
  register(@Body() createCommentDto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(createCommentDto);
  }


  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Данный метод выдает все комментарии из таблицы комментов',
    summary: 'Получить все комментарии',
  })
  @ApiOkResponse({ type: [CommentDto] })
  findAll(): Promise<{count: number, rows: CommentDto[] }> {
    return this.commentService.findAll();
  }

  @Get('/nomination-order/:id')
  @ApiParam({ name: 'id', description: 'id', type: Number })
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Данный метод выдает только те коменты, которые принадлежат данной заявке участника',
    summary: 'Получить все комментарии для конкретного карточки номинанта',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  async getCommentByNominationOrder(
    @Param('id') id
  ): Promise<{count: number, rows: CommentDto[] }> {
    return this.commentService.findByNominationOrder(id);
  }

  @Get('/nomination-order/:id/public')
  @ApiParam({ name: 'id', description: 'id', type: Number })
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Данный метод выдает только те коменты, которые были опубликованы к данной заявке участника',
    summary: 'Получить опубликованные комментарии для конкретного карточки номинанта',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  async getPublicCommentByNominationOrder(
    @Param('id') id
  ): Promise<{count: number, rows: CommentDto[] }> {
    return this.commentService.findByNominationOrderOnlyPublic(id);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'id', type: Number })
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Просто коммент по ID',
    summary: 'Показать конкетный коммент',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  async getUser(@Param('id') id): Promise<CommentDto> {
    return this.commentService.findById(id);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Данный метод можно отправлять одно конкретное поле',
    summary: 'Изменить комментарий по конкретным полям',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  update(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id') id,
  ): Promise<CommentDto> {
    return this.commentService.changeOneFiled(id, updateCommentDto);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Данный метод удаляет коммент по ID',
    summary: 'Удалить комментарий',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  delete(@Param('id') id): Promise<boolean> {
    return this.commentService.delete(id);
  }
}
