import { Injectable } from '@nestjs/common';
import { ISendMail } from '../interface/ISendMail';
import EWS from 'node-ews';


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
          'Subject' : 'Сообщение с сайта  VTAWARD.RU',
          'Body' : {
            'attributes': {
              'BodyType' : 'HTML'
            },
            '$value': data.text
          },
          'ToRecipients' : {
            'Mailbox' : [
							{ 'EmailAddress': data.userTo },
							{ 'EmailAddress': 'vtaward@vost-tech.ru' },
            ]
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
        console.log(data.userTo, {response: '[RESULT]', result: JSON.stringify(result)});
        return {response: '[RESULT]', result: JSON.stringify(result)}
      })
      .catch(err => {
        // tslint:disable-next-line:no-console
        console.log({response: '[ERROR]', err});
        return {response: '[ERROR]', err}
      });
  }
}
