import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Position } from './position.entity';
import { PositionDto } from './dto/position.dto';
import { CreatePositionDto } from './dto/creat-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {

  constructor(
    @Inject('PositionRepository')
    private readonly positionRepository: typeof Position,
  ) {
  }

  async findAll() {
    const positions = await this.positionRepository.findAll<Position>();
    return positions.map(position => new PositionDto(position));
  }

  async getPosition(id: string) {
    const position = await this.positionRepository.findByPk<Position>(id);
    if (!position) {
      throw new HttpException(
        'Position with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new PositionDto(position);
  }

  async create(createPositionDto: CreatePositionDto) {
    try {
      const position = new Position();

      position.value_ru = createPositionDto.value_ru.trim().toLowerCase();
      position.value_en = createPositionDto.value_en.trim().toLowerCase();

      const positionsData = await position.save();

      return new PositionDto(positionsData);
    } catch (err) {
      if (
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'positions_value_ru_key') ||
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'positions_value_en_key')
      ) {
        throw new HttpException(
          `'${createPositionDto.value_ru}' or '${createPositionDto.value_ru}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(id: string, updatePositionDto: UpdatePositionDto) {
    const position = await this.positionRepository.findByPk<Position>(id);
    if (!position) {
      throw new HttpException('Position not found.', HttpStatus.NOT_FOUND);
    }
    position.value_en = updatePositionDto.value_en || position.value_en;
    position.value_en = updatePositionDto.value_en || position.value_en;


    try {
      const data = await position.save();
      return new PositionDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const position = await this.positionRepository.findByPk<Position>(id);
    await position.destroy();
    return new PositionDto(position);
  }

}
