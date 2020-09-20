import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from '../service/mail.service';
import { MailDto } from '../dto/mail.dto';
import { ISendMail } from '../interface/ISendMail';

@Controller('mail')
@ApiTags('Mail')
export class MailController {
  constructor(private readonly service: MailService) {}

  @Post('send')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  send(@Body() mailDto: MailDto): Promise<any> {
    const sendObject: ISendMail = {
      userTo: mailDto.userToId,
      userFrom: 'vtaward@vost-tech.ru',
      text: mailDto.text,
    }
    return this.service.sendEWS(sendObject);
  }

}
