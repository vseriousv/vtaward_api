import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { FeedbackForm } from './feedbackForm.entity';
import { FeedbackFormDto } from './dto/feedbackForm.dto';
import { NominationOrderEntity } from '../nomination-order/nomination-order.entity';

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

  async changeRead(id: number) {
    try {
      const fb = await this.getForm(id);
      if (!fb) {
        throw new HttpException('FeedBack order not found.', HttpStatus.NOT_FOUND);
      }

      const updateFeedBackForm = {
        userId: fb.userId,
        text: fb.text,
        isActive: true,
      }

      await FeedbackForm.update(updateFeedBackForm, { where: {id}});

      return this.getForm(id);
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

}