import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { FeedbackForm } from './feedbackForm.entity';
import { FeedbackFormDto } from './dto/feedbackForm.dto';
import { UpdateFeedbackFormDto } from './dto/update-feedbackForm.dto';
import { CityDto } from '../city/dto/city.dto';
import { City } from '../city/city.entity';
import { StatusResponseDto } from './dto/statusResponse.dto';
import { CreateFeedbackFormDto } from './dto/create-feedbackForm.dto';

export class FeedbackFormService {
  constructor(
    @Inject('FeedbackRepository')
    private readonly feedbackRepository: typeof FeedbackForm,
  ) {
  }

  async findAll(){
    const data = await this.feedbackRepository.findAll<FeedbackForm>()
    return data.map(item => new FeedbackFormDto(item));
  }

  async getForm(id: number) {
    const form = await this.feedbackRepository.findOne<FeedbackForm>({
      where: { id },
    });
    if (!form) {
      throw new HttpException(
        'FeedbackForm with given code not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new FeedbackFormDto(form);
  }

  async create(params) {
    console.log(params);
    const form = new FeedbackForm(params);
    console.log(form);
    await form.save();

    return new FeedbackFormDto(form);
  }

  async update(id: number, param: UpdateFeedbackFormDto) {
    const form = await this.feedbackRepository.findByPk<FeedbackForm>(id);
    if (!form) {
      throw new HttpException('FeedbackForm not found.', HttpStatus.NOT_FOUND);
    }
    form.isActive = param.isActive;
    const data = await form.save();
    return new FeedbackFormDto(data);
  }

  async delete(id: number) {
    const form = await this.feedbackRepository.findByPk<FeedbackForm>(id);
    if (!form) {
      throw new HttpException('FeedbackForm not found.', HttpStatus.NOT_FOUND);
    }
    await form.destroy();
    return new StatusResponseDto('deleted', HttpStatus.OK);
  }


}