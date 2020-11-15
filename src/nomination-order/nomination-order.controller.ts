import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NominationOrderService } from './nomination-order.service';
import { NominationOrderDto } from './dto/nomination-order.dto';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NominationOrderEntity } from './entities/nomination-order.entity';
import { TNominationOrder, TNominationOrderBody } from './interfaces/TNominationOrder';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ApiUtil } from '../shared/ApiUtil';


interface CreateParams {
  bodyData: any;
  req: any;
}

@Controller('nomination-order')
@ApiTags('nomination-order')
export class NominationOrderController {
  constructor(private readonly service: NominationOrderService) {}

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'noSelected', type: String, required: false })
  @ApiOperation({
    description: 'Получить все заявки на номинантов',
    summary: 'Получить все заявки на номинантов',
  })
  @ApiOkResponse({type:[NominationOrderDto]})
  findAll(
    @Query('noSelected') noSelectedStr?: string,
    ): Promise<{ rows: NominationOrderDto[]; count: number }> {
    const noSelected = Boolean(noSelectedStr) || undefined;
    return this.service.findAll(noSelected)
  }

  @Get('/public')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitQuery({ name: 'filter', type: String, required: false })
  @ApiImplicitQuery({ name: 'limit', type: Number, required: false })
  @ApiImplicitQuery({ name: 'offset', type: Number, required: false })
  @ApiOperation({
    description: 'Получить все опубликованные заявки на номинантов',
    summary: 'Получить все опубликованные заявки на номинантов',
  })
  @ApiOkResponse({type:[NominationOrderDto]})
  findAllPublic(
    @Query('filter') filterStr?: string,
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string,
  ): Promise<{ rows: NominationOrderDto[]; count: number }> {
    const filter = ApiUtil.parseFilterJson<NominationOrderEntity>(filterStr);
    const limit = parseInt(limitStr, 10) || undefined;
    const offset = parseInt(offsetStr, 10) || undefined;

    return this.service.findAllPublic(filter, limit, offset)
  }

  @Get('/selected')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Получить все выбранные заявки на номинантов',
    summary: 'Получить все выбранные заявки на номинантов',
  })
  @ApiOkResponse({type:[NominationOrderDto]})
  findAllSelected(): Promise<{ rows: NominationOrderDto[]; count: number }> {
    return this.service.findAllSelected()
  }

  @Get('/step2')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Получить список участников, прошедших во второй тур',
    summary: 'Получить список участников, прошедших во второй тур',
  })
  @ApiOkResponse({type:[NominationOrderDto]})
  findAllStep2(): Promise<{ rows: NominationOrderDto[]; count: number }> {
    return this.service.findAllStep2()
  }

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Создать заявку на номинанта. Разрешенные файлы: type must be: jpg, png, doc, xml, pdf',
    summary: 'Создать заявку на номинанта для пользователя',
  })
  @ApiConsumes('multipart/form-data')
  create(@Req() { files, body, user }): Promise<NominationOrderDto> {

    const createNominationOrder: TNominationOrder = {
      userId: Number(body.userId),
      userFrom: Number(user.id),
      nominationId: Number(body.nominationId),
      textRu: body.textRu,
      textEn: body.textEn,
      public: false,
      isSelected: false,
      isNew: false,
      step2: false,
    }

    return this.service.create(files, createNominationOrder);
  }

  @ApiParam({ name: 'id', description: 'Nomination id' })
  @Get('/read/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Делает заявку прочитанной',
    summary: 'Отправить ID заявки и она поменяет значение isNew на true',
  })
  @ApiOkResponse({type:NominationOrderDto})
  changeIsNew(
    @Param('id') id): Promise<NominationOrderDto> {
    return this.service.changeIsNew(id);
  }

  @ApiParam({ name: 'id', description: 'Nomination id' })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Получить одну заявку на номинанта по ID',
    summary: 'Получить одну заявку на номинанта по ID',
  })
  @ApiOkResponse({type:NominationOrderDto})
  findById(
    @Req() { user },
    @Param('id') id
  ): Promise<NominationOrderDto> {
    return this.service.findById(id, user.id);
  }

  @ApiParam({ name: 'id', description: 'Nomination id' })
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Исправить значения полей для одной заявки на номинацию по её ID, кроме файлов',
    summary: 'Исправить значения полей для одной заявки на номинацию по её ID, кроме файлов',
  })
  @ApiOkResponse({type:NominationOrderDto})
  changeFieldsById(
    @Body() body: TNominationOrderBody,
    @Req() { user },
    @Param('id') id): Promise<NominationOrderDto> {
    const updateNominationOrder: TNominationOrder = {
      userId: body.hasOwnProperty('userId')  ? Number(body.userId) : null,
      userFrom: Number(user.id),
      nominationId: body.hasOwnProperty('nominationId') ? Number(body.nominationId) : null,
      textRu: body.hasOwnProperty('textRu') ? body.textRu : null,
      textEn: body.hasOwnProperty('textEn') ? body.textEn : null,
      public: body.hasOwnProperty('public') ? Boolean(body.public) : null,
      isSelected: body.hasOwnProperty('isSelected') ? Boolean(body.isSelected) : null,
      isNew: false,
      step2: body.hasOwnProperty('step2') ? Boolean(body.step2) : null, 
    }
    return this.service.changeFieldsById(id, updateNominationOrder);
  }

}
