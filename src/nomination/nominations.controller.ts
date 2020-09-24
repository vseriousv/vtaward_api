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
import { NominationsService } from './nominations.service';
import { CreateNominationDto } from './dto/create-nomination.dto';
import { NominationDto } from './dto/nomination.dto';
import { UpdateNominationDto } from './dto/update-nomination.dto';

@Controller('nominations')
@ApiTags('nominations')
export class NominationsController {
  constructor(private readonly nominationService: NominationsService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(
    @Body() createNominationDto: CreateNominationDto,
  ): Promise<CreateNominationDto> {
    return this.nominationService.create(createNominationDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [NominationDto] })
  findAll(): Promise<NominationDto[]> {
    return this.nominationService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: NominationDto })
  async getUser(@Param('id') id): Promise<NominationDto> {
    return this.nominationService.getNomination(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: NominationDto })
  update(
    @Body() updateNominationDto: UpdateNominationDto,
    @Param('id') id,
  ): Promise<NominationDto> {
    return this.nominationService.update(id, updateNominationDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: NominationDto })
  delete(@Param('id') id): Promise<NominationDto> {
    return this.nominationService.delete(id);
  }
}
