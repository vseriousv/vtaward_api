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
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/creat-section.dto';
import { SectionDto } from './dto/section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('sections')
@ApiTags('sections')
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<CreateSectionDto> {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [SectionDto] })
  findAll(): Promise<SectionDto[]> {
    return this.sectionService.findAll();
  }

  @Get(':code')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: SectionDto })
  async getUser(@Param('code') code): Promise<SectionDto> {
    return this.sectionService.getSectionByCode(code);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: SectionDto })
  update(
    @Body() updateSectionDto: UpdateSectionDto,
    @Param('id') id,
  ): Promise<SectionDto> {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: SectionDto })
  delete(@Param('id') id): Promise<SectionDto> {
    return this.sectionService.delete(id);
  }
}
