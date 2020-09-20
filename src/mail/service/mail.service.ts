import { Injectable } from '@nestjs/common';
import { ISendMail } from '../interface/ISendMail';
import mailerService from 'nodemailer';

@Injectable()
export class MailService {

  async sendMailSMTP(data: ISendMail): Promise<any> {
    // tslint:disable-next-line:no-console
    console.log('params', data)

    const htmlMes = 'Тестируем \n ';

    try{
      const transporter = mailerService.createTransport({
        host: 'mailsecurity.vost-tech.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'vtaward@vost-tech.ru', // generated ethereal user
          pass: 'dfjk3WDS', // generated ethereal password
        },
      });

      const mailTo = 'vtawordtest@vost-tech.ru ';
      const result = await transporter.sendMail({
        from: 'Сообщение с сайта <vtaward@vost-tech.ru>',
        to: mailTo,
        subject: 'Message from site vtaward.com',
        text: htmlMes
      });
      // tslint:disable-next-line:no-console
      console.log('Отправил: ', htmlMes);

      return result;
    } catch(e) {
      return { response:'Error', error: e }
    }
  }

}
