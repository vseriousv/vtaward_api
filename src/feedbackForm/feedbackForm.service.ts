import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { FeedbackForm } from './feedbackForm.entity';
import { FeedbackFormDto } from './dto/feedbackForm.dto';
import { MailService } from '../mail/service/mail.service';
import { UsersService} from '../users/users.service';

export class FeedbackFormService {
  constructor(
    @Inject('FeedbackRepository')
    private readonly feedbackRepository: typeof FeedbackForm,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
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
    try {
      const user = await this.userService.getUserById(params.userId);
      console.log(params);
      const form = new FeedbackForm(params);
      console.log(form);
      await form.save();

      const HTMLText = `
Была заполнена форма на сайте.<br /><br />
От: ${user.tabNumber} - ${user.lastnameRu} ${user.firstnameRu} ${user.patronymicRu}.<br />
E-mail: ${user.email} <br /><br />
Текст сообщения:<br />
${params.text}
        `;
      await this.mailService.sendEWS({
        userTo: 'vtaward@vost-tech.ru',
        userFrom: user.email,
        text: HTMLText
      });
      return new FeedbackFormDto(form);
    } catch (e) {
      throw new BadRequestException(e)
    }
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