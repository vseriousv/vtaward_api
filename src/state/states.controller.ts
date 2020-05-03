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
import {StatesService} from './states.service';
import {CreateStateDto} from './dto/creat-state.dto';
import { StateDto } from './dto/state.dto';
import {UpdateStateDto} from './dto/update-state.dto';

@Controller('states')
@ApiTags('states')
export class StatesController {
  constructor(private readonly stateService: StatesService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(
    @Body() createStateDto: CreateStateDto,
  ): Promise<CreateStateDto> {
    return this.stateService.create(createStateDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [StateDto] })
  findAll(): Promise<StateDto[]> {
    return this.stateService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: StateDto })
  async getUser(@Param('id') id): Promise<StateDto> {
    return this.stateService.getState(id);
  }


  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: StateDto })
  update(
    @Body() updateSectionDto: UpdateStateDto,
    @Param('id') id,
  ): Promise<StateDto> {
    return this.stateService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: StateDto })
  delete(@Param('id') id): Promise<StateDto> {
    return this.stateService.delete(id);
  }
}
