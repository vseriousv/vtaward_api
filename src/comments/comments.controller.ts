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
    description: 'Создать комментарий',
    summary: 'Данный метод создает новый коментарий',
  })
  @UseGuards(AuthGuard('jwt'))
  register(@Body() createCommentDto: CreateCommentDto): Promise<CommentDto[]> {
    return this.commentService.create(createCommentDto);
  }


  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Получить все комментарии',
    summary: 'Данный метод выдает все комментарии из таблицы комментов',
  })
  @ApiOkResponse({ type: [CommentDto] })
  findAll(): Promise<CommentDto[]> {
    return this.commentService.findAll();
  }

  @Get('/nomination-order/:id')
  @ApiParam({ name: 'id', description: 'id', type: Number })
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Получить все комментарии для конкретного карточки номинанта',
    summary: 'Данный метод выдает только те коменты, которые принадлежат данной заявке участника',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  async getCommentByNominationOrder(@Param('id') id): Promise<CommentDto[]> {
    return this.commentService.findByNominationOrder(id);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'id', type: Number })
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Показать конкетный коммент',
    summary: 'Просто коммент по ID',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  async getUser(@Param('id') id): Promise<CommentDto[]> {
    return this.commentService.findById(id);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Изменить комментарий по конкретным полям',
    summary: 'Данный метод можно отправлять одно конкретное поле',
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
    description: 'Удалить комментарий',
    summary: 'Данный метод удаляет коммент по ID',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CommentDto })
  delete(@Param('id') id): Promise<CommentDto> {
    return this.commentService.delete(id);
  }
}
