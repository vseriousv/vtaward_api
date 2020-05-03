
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { State } from './state.entity';
import { StateDto } from './dto/state.dto';
import { CreateStateDto } from './dto/creat-state.dto';
import {UpdateStateDto} from './dto/update-state.dto';
import { ConfigService } from './../shared/config/config.service';

@Injectable()
export class StatesService {

  constructor(
    @Inject('StateRepository')
    private readonly stateRepository: typeof State,
  ) {}

  async findAll() {
    const states = await this.stateRepository.findAll<State>();
    return states.map(state => new StateDto(state));
  }

  async getState(id: string) {
    const state = await this.stateRepository.findByPk<State>(id);
    if (!state) {
      throw new HttpException(
        'State with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new StateDto(state);
  }

  async create(createStateDto: CreateStateDto) {
    try {
      const state = new State();

      state.value_ru = createStateDto.value_ru.trim().toLowerCase();
      state.value_en = createStateDto.value_en.trim().toLowerCase();

      const stateData = await state.save();

      return new StateDto(stateData);
    } catch (err) {
      if (
        ( err.name === 'SequelizeUniqueConstraintError' &&
        err.original.constraint === 'state_value_ru_key') ||
        ( err.name === 'SequelizeUniqueConstraintError' &&
          err.original.constraint === 'state_value_en_key')
      ) {
        throw new HttpException(
          `'${createStateDto.value_ru}' or '${createStateDto.value_ru}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(id: string, updateStateDto: UpdateStateDto) {
    const state = await this.stateRepository.findByPk<State>(id);
    if (!state) {
      throw new HttpException('State not found.', HttpStatus.NOT_FOUND);
    }
    state.value_en = updateStateDto.value_en || state.value_en;
    state.value_en = updateStateDto.value_en || state.value_en;


    try {
      const data = await state.save();
      return new StateDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const state = await this.stateRepository.findByPk<State>(id);
    await state.destroy();
    return new StateDto(state);
  }

}
