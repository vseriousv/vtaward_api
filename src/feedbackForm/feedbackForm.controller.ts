import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FeedbackFormService } from './feedbackForm.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedbackFormDto } from './dto/create-feedbackForm.dto';
import { FeedbackFormDto } from './dto/feedbackForm.dto';


@Controller('feedbackForm')
@ApiTags('feedbackForm')
export class FeedbackFormController {
  constructor(private readonly feedbackFormService: FeedbackFormService) {}

  @Post('')
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
  @Get('/read/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: FeedbackFormDto })
  async changeRead(@Param('id') id): Promise<FeedbackFormDto> {
    return this.feedbackFormService.changeRead(id);
  }

  @ApiParam({ name: 'id', description: 'id', type: Number })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: FeedbackFormDto })
  async getForm(@Param('id') id): Promise<FeedbackFormDto> {
    return this.feedbackFormService.getForm(id);
  }



}