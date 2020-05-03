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
import {VoteService} from './votes.service';
import {CreateVoteDto} from './dto/creat-vote.dto';
import { VoteDto } from './dto/vote.dto';
import {UpdateVoteDto} from './dto/update-vote.dto';

@Controller('votes')
@ApiTags('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(
    @Body() createVoteDto: CreateVoteDto,
  ): Promise<CreateVoteDto> {
    return this.voteService.create(createVoteDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [VoteDto] })
  findAll(): Promise<VoteDto[]> {
    return this.voteService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: VoteDto })
  async getUser(@Param('id') id): Promise<VoteDto> {
    return this.voteService.getVote(id);
  }


  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: VoteDto })
  update(
    @Body() updateVoteDto: UpdateVoteDto,
    @Param('id') id,
  ): Promise<VoteDto> {
    return this.voteService.update(id, updateVoteDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: VoteDto })
  delete(@Param('id') id): Promise<VoteDto> {
    return this.voteService.delete(id);
  }
}
