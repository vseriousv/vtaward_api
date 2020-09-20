import { Injectable } from '@nestjs/common';
import { ISendMail } from '../interface/ISendMail';
import { stringify } from 'querystring';
// import mailerService from 'nodemailer';
// tslint:disable-next-line:no-var-requires
const EWS = require('node-ews');



@Injectable()
export class MailService {

  async sendEWS(data:ISendMail): Promise<any> {
    const ewsConfig = {
      username: 'vtaward@vost-tech.ru',
      password: 'dfjk3WDS',
      host: 'https://mail.vost-tech.ru',
    };

    const ews = new EWS(ewsConfig);
    const ewsFunction = 'CreateItem';

    const ewsArgs = {
      'attributes' : {
        'MessageDisposition' : 'SendAndSaveCopy'
      },
      'SavedItemFolderId': {
        'DistinguishedFolderId': {
          'attributes': {
            'Id': 'sentitems'
          }
        }
      },
      'Items' : {
        'Message' : {
          'ItemClass': 'IPM.Note',
          'Subject' : 'Test EWS Email',
          'Body' : {
            'attributes': {
              'BodyType' : 'Text'
            },
            '$value': 'This is a test email'
          },
          'ToRecipients' : {
            'Mailbox' : {
              'EmailAddress':'vtawordtest@vost-tech.ru'
            }
          },
          'IsRead': 'false'
        }
      }
    };
    // tslint:disable-next-line:no-console
    console.log('[TEST]:', data)
    ews.run(ewsFunction, ewsArgs)
      .then(result => {
        // tslint:disable-next-line:no-console
        console.log({response: '[RESULT]', result: JSON.stringify(result)});
        return {response: '[RESULT]', result: JSON.stringify(result)}
      })
      .catch(err => {
        // tslint:disable-next-line:no-console
        console.log({response: '[ERROR]', err});
        return {response: '[ERROR]', err}
      });
  }


  // async sendMailSMTP(data: ISendMail): Promise<any> {
  //   // tslint:disable-next-line:no-console
  //   console.log('params', data)
  //
  //   const htmlMes = 'Тестируем \n ';
  //
  //   try{
  //     const transporter = mailerService.createTransport({
  //       host: 'mail.vost-tech.ru',
  //       port: 25,
  //       // secure: false, // true for 465, false for other ports
  //       auth: {
  //         user: 'vtaward@vost-tech.ru', // generated ethereal user
  //         pass: 'dfjk3WDS', // generated ethereal password
  //       },
  //     });
  //
  //     const result = await transporter.sendMail({
  //       from: '"Сообщение с сайта" <vtaward@vost-tech.ru>',
  //       to: 'vtawordtest@vost-tech.ru',
  //       subject: 'Message from site vtaward.com',
  //       text: htmlMes
  //     });
  //     // tslint:disable-next-line:no-console
  //     console.log('Отправил: ', htmlMes);
  //
  //     return { response: 'Send', result};
  //   } catch(e) {
  //     return { response: 'Error', error: e }
  //   }
  // }

}
