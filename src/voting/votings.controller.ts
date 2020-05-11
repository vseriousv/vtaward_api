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
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VotingsService } from './votings.service';
import { CreateVotingDto } from './dto/creat-voting.dto';
import { VotingDto } from './dto/voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';

@Controller('votings')
@ApiTags('votings')
export class VotingsController {
  constructor(private readonly votingService: VotingsService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createFiled(
    @Body() createVotingDto: CreateVotingDto,
  ): Promise<CreateVotingDto> {
    return this.votingService.create(createVotingDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [VotingDto] })
  findAll(): Promise<VotingDto[]> {
    return this.votingService.getVotingAll();
  }

  @ApiParam({ name: 'id', description: 'id', type: String })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: VotingDto })
  async getVoting(@Param('id') id): Promise<VotingDto> {
    return this.votingService.getVoting(id);
  }

  @ApiParam({ name: 'id', description: 'id', type: String })
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: VotingDto })
  update(
    @Body() updateVotingDto: UpdateVotingDto,
    @Param('id') id,
  ): Promise<VotingDto> {
    return this.votingService.update(id, updateVotingDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: VotingDto })
  delete(@Param('id') id): Promise<VotingDto> {
    return this.votingService.delete(id);
  }
}
