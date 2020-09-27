import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NominationOrderService } from './nomination-order.service';
import { NominationOrderDto } from './dto/nomination-order.dto';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateNominationOrderDto } from './dto/create-nomination-order.dto';
import { NominationOrderEntity } from './nomination-order.entity';
import { orderFileFilter } from '../shared/utils/order-file-filter';
import { generateFilename } from '../shared/utils/generation-file-name';
import { UpdateNominationOrderDto } from './dto/update-nomination-order.dto';
import { TNominationOrder, TNominationOrderBody } from './interfaces/TNominationOrder';


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
  @ApiOperation({
    description: 'Получить все заявки на номинантов',
    summary: 'Получить все заявки на номинантов',
  })
  @ApiOkResponse({type:[NominationOrderDto]})
  findAll(): Promise<{ rows: NominationOrderDto[]; count: number }> {
    return this.service.findAll()
  }



  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Создать заявку на номинанта. Разрешенные файлы: type must be: jpg, png, doc, xml, pdf',
    summary: 'Создать заявку на номинанта для пользователя',
  })
  @ApiConsumes('multipart/form-data')
  create(@Req() { files, body, user }): Promise<NominationOrderEntity> {

    const createNominationOrder: TNominationOrder = {
      userId: Number(body.userId),
      userFrom: Number(user.id),
      nominationId: Number(body.nominationId),
      textRu: body.textRu,
      textEn: body.textEn,
      public: false,
      isNew: false,
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
    @Param('id') id): Promise<NominationOrderEntity> {
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
  findById(@Param('id') id): Promise<NominationOrderEntity> {
    return this.service.findById(id);
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
    @Param('id') id): Promise<NominationOrderEntity> {
    const updateNominationOrder: TNominationOrder = {
      userId: body.hasOwnProperty('userId')  ? Number(body.userId) : null,
      userFrom: Number(user.id),
      nominationId: body.hasOwnProperty('nominationId') ? Number(body.nominationId) : null,
      textRu: body.hasOwnProperty('textRu') ? body.textRu : null,
      textEn: body.hasOwnProperty('textEn') ? body.textEn : null,
      public: body.hasOwnProperty('public') ? Boolean(body.public) : null,
      isNew: false,
    }
    return this.service.changeFieldsById(id, updateNominationOrder);
  }



}
