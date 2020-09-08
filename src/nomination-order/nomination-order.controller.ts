import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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

@Controller('nomination-order')
@ApiTags('nomination-order')
export class NominationOrderController {
  constructor(private readonly service: NominationOrderService) {}

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Get all nomination order',
    summary: 'Get all nomination order',
  })
  @ApiOkResponse({type:[NominationOrderDto]})
  findAll(): Promise<{ rows: NominationOrderDto[]; count: number }> {
    return this.service.findAll()
  }



  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Create nomination order for user. For file: type must be: jpg, png, doc, xml, pdf',
    summary: 'Create nomination order for user',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files',10, {
      storage: diskStorage({
        destination: '../files/nomination-orders',
        filename: generateFilename,
      }),
      fileFilter: orderFileFilter,
    }),
  )
  createOrder(
    @Body() bodyData,
    @UploadedFiles() files,
  ): Promise<NominationOrderEntity> {
    const createNominationOrder: CreateNominationOrderDto = {
      userId: Number(bodyData.userId),
      nominationId: Number(bodyData.nominationId),
      textRu: bodyData.textRu,
      textEn: bodyData.textEn,
    }
    return this.service.create(files, createNominationOrder);
  }



  @ApiParam({ name: 'id', description: 'Nomination id' })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Get one nomination order by id',
    summary: 'Get one nomination order by id',
  })
  @ApiOkResponse({type:NominationOrderDto})
  findById(@Param('id') id): Promise<NominationOrderEntity> {
    return this.service.findById(id);
  }

}
