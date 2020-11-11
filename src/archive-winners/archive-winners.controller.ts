import { Controller, Body, Post, Get, Param, Put, Delete, Patch, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam, ApiBearerAuth,} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ArchiveWinnersService } from './archive-winners.service';
import { CreateArchiveWinnersDto } from './dto/create-archive-winners.dto';
import { ArchiveWinnersDto } from './dto/archive-winners.dto';
import { UpdateArchiveWinnersDto } from './dto/update-archive-winners.dto';

@Controller('archive-winners')
@ApiTags('Archive-winners')
export class ArchiveWinnersController {
	constructor(private readonly service: ArchiveWinnersService) {}

	@Post('create')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	createCtrl(@Body() data: CreateArchiveWinnersDto) {
		return this.service.create(data);
	}

	@Get('')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({
		description: 'Данный метод выдает все данные из таблицы архив победителей',
		summary: 'Получить все данные',
	})
	@ApiOkResponse({ type: [ArchiveWinnersDto] })
	findAll(): Promise<{ count: number; rows: ArchiveWinnersDto[] }> {
		return this.service.findAll();
    }
    
	@Get('/:id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', description: 'id', type: Number })
    @ApiOkResponse({ type: [ArchiveWinnersDto] })
    findById(@Param('id') id): Promise<ArchiveWinnersDto> {
        return this.service.findById(id);
	}

	@Put('/:id')
	@ApiParam({ name: 'id', description: 'id', type: Number })
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [ArchiveWinnersDto] })
    update(
		@Body() updateArchiveWinnersDto: UpdateArchiveWinnersDto,
		@Param('id') id,
	): Promise<ArchiveWinnersDto> {
        return this.service.update(id, updateArchiveWinnersDto);
	}

	@Patch('/:id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiParam({ name: 'id', description: 'id', type: Number })
	@ApiOperation({
		description: 'Данный метод может отправлять одно конкретное поле',
		summary: 'Изменить данные по конкретным полям',
	  })
	@ApiOkResponse({ type: ArchiveWinnersDto })
	changeOneFiled(
		@Body() updateArchiveWinnersDto: UpdateArchiveWinnersDto,
		@Param('id') id,
	): Promise<ArchiveWinnersDto> {
		return this.service.changeOneFiled(id, updateArchiveWinnersDto);
		}

	@Delete('/:id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiParam({ name: 'id', description: 'id', type: Number })
	@ApiOkResponse({ type: [ArchiveWinnersDto] })
	delete(@Param('id')id): Promise<ArchiveWinnersDto> {
		return this.service.delete(id);
	}
}
