import { EntityFilter } from './EntityFilter';
import { BadRequestException } from '@nestjs/common';

export class ApiUtil {

  public static isAdminApi = process.env.SERVICE === 'admin-api';

  public static parseFilterJson<T = any>(str: string): Array<EntityFilter<T>> | EntityFilter<T> {
    try {
      return !!str ? JSON.parse(str) : undefined;

    } catch (e) {
      throw new BadRequestException('Unable to parse filter JSON');
    }
  }

}