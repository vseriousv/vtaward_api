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
import { WinnersService } from './winners.service';
import { CreateWinnerDto } from './dto/creat-winner.dto';
import { WinnerDto } from './dto/winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';

@Controller('winners')
@ApiTags('winners')
export class WinnersController {
  constructor(private readonly winnerService: WinnersService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() createWinnerDto: CreateWinnerDto): Promise<CreateWinnerDto> {
    return this.winnerService.create(createWinnerDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [WinnerDto] })
  findAll(): Promise<WinnerDto[]> {
    return this.winnerService.findAll();
  }

  @Get('voting/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: WinnerDto })
  getWinners(@Param('id') id): Promise<WinnerDto[]> {
    return this.winnerService.findWinners(id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: WinnerDto })
  async getUser(@Param('id') id): Promise<WinnerDto> {
    return this.winnerService.getWinner(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: WinnerDto })
  update(
    @Body() updateSectionDto: UpdateWinnerDto,
    @Param('id') id,
  ): Promise<WinnerDto> {
    return this.winnerService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: WinnerDto })
  delete(@Param('id') id): Promise<WinnerDto> {
    return this.winnerService.delete(id);
  }
}
