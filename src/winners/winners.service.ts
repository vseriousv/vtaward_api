import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Winner } from './winner.entity';
import { WinnerDto } from './dto/winner.dto';
import { CreateWinnerDto } from './dto/creat-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';

@Injectable()
export class WinnersService {
  constructor(
    @Inject('WinnerRepository')
    private readonly winnerRepository: typeof Winner,
  ) {}

  async findAll() {
    const winners = await this.winnerRepository.findAll<Winner>({
      order: [['id', 'ASC']],
    });
    return winners.map(winner => new WinnerDto(winner));
  }

  async getWinner(id: string) {
    const winner = await this.winnerRepository.findByPk<Winner>(id);
    if (!winner) {
      throw new HttpException(
        'Winner with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new WinnerDto(winner);
  }

  async create(createWinnerDto: CreateWinnerDto) {
    try {
      const winner = new Winner();

      winner.user_id = createWinnerDto.user_id;
      winner.year_voting = createWinnerDto.year_voting;
      winner.type_voting = createWinnerDto.type_voting;

      const winnersData = await winner.save();

      return new WinnerDto(winnersData);
    } catch (err) {
      if (
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'winners_value_ru_key') ||
        (err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'winners_value_en_key')
      ) {
        throw new HttpException(`'already exists`, HttpStatus.CONFLICT);
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateWinnerDto: UpdateWinnerDto) {
    const winner = await this.winnerRepository.findByPk<Winner>(id);
    if (!winner) {
      throw new HttpException('Winner not found.', HttpStatus.NOT_FOUND);
    }
    winner.user_id = updateWinnerDto.user_id || winner.user_id;
    winner.year_voting = updateWinnerDto.year_voting || winner.year_voting;
    winner.type_voting = updateWinnerDto.type_voting || winner.type_voting;

    try {
      const data = await winner.save();
      return new WinnerDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const winner = await this.winnerRepository.findByPk<Winner>(id);
    await winner.destroy();
    return new WinnerDto(winner);
  }
}
