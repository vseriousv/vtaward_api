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
import { ContentMainService } from './contentMain.service';
import { ContentMainDto } from './dto/contentMain.dto';
import { ContentMain } from './contentMain.entity';


@Controller('contentMain')
@ApiTags('contentMain')
export class ContentMainController {
  constructor(private readonly contentMainService: ContentMainService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ContentMain] })
  register(
    @Body() contentMainDto: ContentMainDto
  ): Promise<ContentMainDto> {
    return this.contentMainService.createOrUpdate(contentMainDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ContentMain] })
  findAll(): Promise<ContentMainDto[]> {
    return this.contentMainService.findAll();
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ContentMain] })
  update(
    @Body() contentMainDto: ContentMainDto
  ): Promise<ContentMainDto> {
    return this.contentMainService.createOrUpdate(contentMainDto);
  }
}
