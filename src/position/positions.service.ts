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
  ) {}

  async findAll() {
    const positions = await this.positionRepository.findAll<Position>({
      order: [['id', 'ASC']],
    });
    return positions.map(position => new PositionDto(position));
  }

  async getPositionByCode(code: string) {
    const position = await this.positionRepository.findOne<Position>({
      where: { code },
    });
    if (!position) {
      throw new HttpException(
        'Position with given code not found',
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
      position.code = createPositionDto.code;

      const positionsData = await position.save();

      return new PositionDto(positionsData);
    } catch (err) {
      if (
        err.name === 'SequelizeUniqueConstraintError' &&
        err.original.constraint === 'positions_code_key'
      ) {
        throw new HttpException(
          `'${createPositionDto.code}' already exists`,
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
    position.value_ru = updatePositionDto.value_ru || position.value_ru;
    position.value_en = updatePositionDto.value_en || position.value_en;
    position.code = updatePositionDto.code || position.code;

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
