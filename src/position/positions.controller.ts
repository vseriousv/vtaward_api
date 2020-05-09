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
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/creat-position.dto';
import { PositionDto } from './dto/position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
@ApiTags('positions')
export class PositionsController {
  constructor(private readonly positionService: PositionsService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<CreatePositionDto> {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [PositionDto] })
  findAll(): Promise<PositionDto[]> {
    return this.positionService.findAll();
  }

  @Get(':code')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PositionDto })
  async getUser(@Param('code') code): Promise<PositionDto> {
    return this.positionService.getPositionByCode(code);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PositionDto })
  update(
    @Body() updateSectionDto: UpdatePositionDto,
    @Param('id') id,
  ): Promise<PositionDto> {
    return this.positionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PositionDto })
  delete(@Param('id') id): Promise<PositionDto> {
    return this.positionService.delete(id);
  }
}
