import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FeedbackFormService } from './feedbackForm.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedbackFormDto } from './dto/create-feedbackForm.dto';
import { FeedbackFormDto } from './dto/feedbackForm.dto';
import { UpdateFeedbackFormDto } from './dto/update-feedbackForm.dto';
import { StatusResponseDto } from './dto/statusResponse.dto';


@Controller('feedbackForm')
@ApiTags('feedbackForm')
export class FeedbackFormController {
  constructor(private readonly feedbackFormService: FeedbackFormService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() createFeedbackFormDto: CreateFeedbackFormDto): Promise<CreateFeedbackFormDto> {
    return this.feedbackFormService.create(createFeedbackFormDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [FeedbackFormDto] })
  findAll(): Promise<FeedbackFormDto[]> {
    return this.feedbackFormService.findAll();
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: FeedbackFormDto })
  async getForm(@Param('id') id): Promise<FeedbackFormDto> {
    return this.feedbackFormService.getForm(id);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: FeedbackFormDto })
  update(
    @Body() updateFeedbackFormDto: UpdateFeedbackFormDto,
    @Param('id') id,
  ): Promise<FeedbackFormDto> {
    return this.feedbackFormService.update(id, updateFeedbackFormDto);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: StatusResponseDto })
  delete(@Param('id') id): Promise<StatusResponseDto> {
    return this.feedbackFormService.delete(id);
  }
}