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
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/creat-participant.dto';
import { ParticipantDto } from './dto/participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantWithVotesDto } from './dto/participantWithVotes.dto';

@Controller('participants')
@ApiTags('participants')
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantsService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<CreateParticipantDto> {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ParticipantDto] })
  findAll(): Promise<ParticipantDto[]> {
    return this.participantService.findAll();
  }

  @Get('/isactive')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ParticipantWithVotesDto] })
  findIsActive(): Promise<ParticipantWithVotesDto[]> {
    return this.participantService.findIsActive();
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ParticipantDto })
  async getUser(@Param('id') id): Promise<ParticipantDto> {
    return this.participantService.getParticipant(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ParticipantDto })
  update(
    @Body() updateSectionDto: UpdateParticipantDto,
    @Param('id') id,
  ): Promise<ParticipantDto> {
    return this.participantService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ParticipantDto })
  delete(@Param('id') id): Promise<ParticipantDto> {
    return this.participantService.delete(id);
  }
}
