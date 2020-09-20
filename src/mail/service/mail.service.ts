import { Injectable } from '@nestjs/common';
import { MailDto } from '../dto/mail.dto';
import { ISendMail } from '../interface/ISendMail';
import EWS from 'node-ews';

@Injectable()
export class MailService {

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
        console.log('[RESULT]:[true]:', JSON.stringify(result));
      })
      .catch(err => {
        console.log('[ERROR]:[catch]:', err.message);
      });
    return true;
  }

}
