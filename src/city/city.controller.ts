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
import { CityService } from './city.service';
import { CreateCityDto } from './dto/creat-city.dto';
import { CityDto } from './dto/city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
@ApiTags('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() createCityDto: CreateCityDto): Promise<CreateCityDto> {
    return this.cityService.create(createCityDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [CityDto] })
  findAll(): Promise<CityDto[]> {
    return this.cityService.findAll();
  }

  @Get(':code')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CityDto })
  async getUser(@Param('code') code): Promise<CityDto> {
    return this.cityService.getCityByCode(code);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CityDto })
  update(
    @Body() updateCityDto: UpdateCityDto,
    @Param('id') id,
  ): Promise<CityDto> {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CityDto })
  delete(@Param('id') id): Promise<CityDto> {
    return this.cityService.delete(id);
  }
}
