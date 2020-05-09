import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { City } from './city.entity';
import { CityDto } from './dto/city.dto';
import { CreateCityDto } from './dto/creat-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {

  constructor(
    @Inject('CityRepository')
    private readonly cityRepository: typeof City,
  ) {
  }

  async findAll() {
    const cities = await this.cityRepository.findAll<City>();
    return cities.map(city => new CityDto(city));
  }

  async getCity(id: string) {
    const city = await this.cityRepository.findByPk<City>(id);
    if (!city) {
      throw new HttpException(
        'City with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new CityDto(city);
  }

  async create(createCityDto: CreateCityDto) {
    try {
      const city = new City();

      city.state_id = createCityDto.state_id;
      city.value_ru = createCityDto.value_ru.trim().toLowerCase();
      city.value_en = createCityDto.value_en.trim().toLowerCase();

      const cityData = await city.save();

      // return new UserLoginResponseDto(userData, token);
      return new CityDto(cityData);
    } catch (err) {
      if (
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'city_value_ru_key') ||
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'city_value_en_key')
      ) {
        throw new HttpException(
          `'${createCityDto.value_ru}' or '${createCityDto.value_ru}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(id: string, updateCityDto: UpdateCityDto) {
    const city = await this.cityRepository.findByPk<City>(id);
    if (!city) {
      throw new HttpException('City not found.', HttpStatus.NOT_FOUND);
    }

    city.state_id = updateCityDto.state_id || city.state_id;
    city.value_ru = updateCityDto.value_ru || city.value_ru;
    city.value_en = updateCityDto.value_en || city.value_en;


    try {
      const data = await city.save();
      return new CityDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const city = await this.cityRepository.findByPk<City>(id);
    await city.destroy();
    return new CityDto(city);
  }

}
