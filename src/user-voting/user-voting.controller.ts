import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserVotingService } from './user-voting.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersVotingResponseDto } from './dto/users-voting-response.dto';
import { UsersVotingDto } from './dto/users-voting.dto';
import { CreateUsersVotingDto } from './dto/create-users-voting.dto';
import { ApiUtil } from '../shared/ApiUtil';
import { UserVotingEntity } from './entities/user-voting.entity';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('user-voting')
@ApiTags('user-voting')
export class UserVotingController {
  constructor(
    private readonly service: UserVotingService,
  ) {
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'filter', type: String, required: false })
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'offset', type: Number, required: false })
  @ApiOkResponse({ type: UsersVotingDto, isArray: true })
  @ApiOperation({
    summary: 'Получить все голоса',
  })
  findAll(
    @Query('filter') filterStr?: string,
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string,
  ): Promise<UsersVotingResponseDto> {
    const filter = ApiUtil.parseFilterJson<UserVotingEntity>(filterStr);
    const limit = parseInt(limitStr, 10) || undefined;
    const offset = parseInt(offsetStr, 10) || undefined;
    return this.service.findAll(filter, limit, offset);
  }

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UsersVotingDto })
  @ApiOperation({
    summary: 'Добавить голос в базу данных',
  })
  create(
    @Req() request,
    @Body() data: CreateUsersVotingDto,
  ): Promise<UsersVotingDto> {
    return this.service.create(request.user.id, data);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Табличный номер в базе данных' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UsersVotingDto })
  @ApiOperation({
    summary: 'Получить голос по его ID',
  })
  findById(
    @Param('id') id,
  ): Promise<UsersVotingDto> {
    return this.service.findById(id);
  }
}
