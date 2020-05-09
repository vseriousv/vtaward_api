import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { State } from './state.entity';
import { StateDto } from './dto/state.dto';
import { CreateStateDto } from './dto/creat-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class StatesService {
  constructor(
    @Inject('StateRepository')
    private readonly stateRepository: typeof State,
  ) {}

  async findAll() {
    const states = await this.stateRepository.findAll<State>({
      order: [['id', 'ASC']],
    });
    return states.map(state => new StateDto(state));
  }

  async getStateByCode(code: string) {
    const state = await this.stateRepository.findOne<State>({
      where: { code },
    });
    if (!state) {
      throw new HttpException(
        'State with given code not found',
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
      state.code = createStateDto.code;

      const stateData = await state.save();

      return new StateDto(stateData);
    } catch (err) {
      if (
        err.name === 'SequelizeUniqueConstraintError' &&
        err.original.constraint === 'states_code_key'
      ) {
        throw new HttpException(
          `'${createStateDto.code}' already exists`,
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
    state.value_ru = updateStateDto.value_ru || state.value_ru;
    state.value_en = updateStateDto.value_en || state.value_en;
    state.code = updateStateDto.code || state.code;

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
