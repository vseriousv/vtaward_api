import { Injectable } from '@nestjs/common';
import { MailDto } from '../dto/mail.dto';
import { ISendMail } from '../interface/ISendMail';
import EWS from 'node-ews';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: ISendMail): Promise<boolean> {
    const ewsConfig = {
      username: 'vtaward@vost-tech.ru',
      password: 'dfjk3WDS',
      host: 'mail.vost-tech.ru'
    }

    const ews = new EWS(ewsConfig);
    const ewsFunction = 'ExpandDL';

    const ewsArgs = {
      'Mailbox': {
        'EmailAddress':'vtawordtest@vost-tech.ru'
      },
      'UserOofSettings': {
        'InternalReply': {
          'Message':'InternalReply: I am out of office.  This is my internal reply.'
        },
        'ExternalReply': {
          'Message':'ExternalReply: I am out of office. This is my external reply.'
        }
      }
    };

    ews.run(ewsFunction, ewsArgs)
      .then(result => {
        // tslint:disable-next-line:no-console
        console.log('[RESULT]:[true]:', JSON.stringify(result));
      })
      .catch(err => {
        // tslint:disable-next-line:no-console
        console.log('[ERROR]:[catch]:', err.message);
      });
    return true;
  }

  async sendMailSMTP(data: ISendMail): Promise<boolean> {
    this
      .mailerService
      .sendMail({
        to: 'vtawordtest@vost-tech.ru', // list of receivers
        from: 'vtaward@vost-tech.ru', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(result => {
        // tslint:disable-next-line:no-console
        console.log('[RESULT SMTP]:[true]:', JSON.stringify(result));
      })
      .catch(err => {
        // tslint:disable-next-line:no-console
        console.log('[ERROR SMTP]:[catch]:', err.message);
      });

    return true;
  }

}
