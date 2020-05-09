
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Nomination } from './nomination.entity';
import { NominationDto } from './dto/nomination.dto';
import { CreateNominationDto } from './dto/creat-nomination.dto';
import {UpdateNominationDto} from './dto/update-nomination.dto';
import { ConfigService } from './../shared/config/config.service';

@Injectable()
export class NominationsService {

  constructor(
    @Inject('NominationRepository')
    private readonly nominationRepository: typeof Nomination,
  ) {}

  async findAll() {
    const nominations = await this.nominationRepository.findAll<Nomination>();
    return nominations.map(nomination => new NominationDto(nomination));
  }

  async getNomination(id: string) {
    const nomination = await this.nominationRepository.findByPk<Nomination>(id);
    if (!nomination) {
      throw new HttpException(
        'Nomination with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new NominationDto(nomination);
  }
  //
  // async getUserByEmail(email: string) {
  //   return await this.usersRepository.findOne<User>({
  //     where: { email },
  //   });
  // }

  async create(createNominationDto: CreateNominationDto) {
    try {
      const nomination = new Nomination();

      nomination.value_ru = createNominationDto.value_ru.trim().toLowerCase();
      nomination.value_en = createNominationDto.value_en.trim().toLowerCase();

      // const salt = await genSalt(10);
      // user.password = await hash(createUserDto.password, salt);

      const nominationsData = await nomination.save();

      // when registering then log user in automatically by returning a token
      // const token = await this.signToken(userData);
      // return new UserLoginResponseDto(userData, token);
      return new NominationDto(nominationsData);
    } catch (err) {
      if (
        ( err.name === 'SequelizeUniqueConstraintError' &&
        err.original.constraint === 'nominations_value_ru_key') ||
        ( err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'nominations_value_en_key')
      ) {
        throw new HttpException(
          `User with email '${createNominationDto.value_ru}' or '${createNominationDto.value_ru}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

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
