import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Nomination } from './nomination.entity';
import { NominationDto } from './dto/nomination.dto';
import { CreateNominationDto } from './dto/creat-nomination.dto';
import { UpdateNominationDto } from './dto/update-nomination.dto';

@Injectable()
export class NominationsService {
  constructor(
    @Inject('NominationRepository')
    private readonly nominationRepository: typeof Nomination,
  ) {}

  async findAll() {
    const nominations = await this.nominationRepository.findAll<Nomination>({
      order: [['id', 'ASC']],
    });
    return nominations.map(nomination => new NominationDto(nomination));
  }

  async getNomination(id: number) {
    const nomination = await this.nominationRepository.findOne<Nomination>({
      where: { id },
    });
    if (!nomination) {
      throw new HttpException(
        'Nomination with given code not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new NominationDto(nomination);
  }

  async create(createNominationDto: CreateNominationDto) {
    try {
      const nomination = new Nomination();

      nomination.value_ru = createNominationDto.value_ru.trim().toLowerCase();
      nomination.value_en = createNominationDto.value_en.trim().toLowerCase();

      const nominationsData = await nomination.save();

      return new NominationDto(nominationsData);
    } catch (err) {

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateNominationDto: UpdateNominationDto) {
    const nomination = await this.nominationRepository.findByPk<Nomination>(id);
    if (!nomination) {
      throw new HttpException('Nomination not found.', HttpStatus.NOT_FOUND);
    }
    nomination.value_ru = updateNominationDto.value_ru || nomination.value_ru;
    nomination.value_en = updateNominationDto.value_en || nomination.value_en;

    try {
      const data = await nomination.save();
      return new NominationDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const nomination = await this.nominationRepository.findByPk<Nomination>(id);
    await nomination.destroy();
    return new NominationDto(nomination);
  }
}
