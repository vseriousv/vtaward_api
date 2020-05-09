import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/enum/role';
import { Column } from 'sequelize-typescript';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly tab_number: string;

  @ApiProperty()
  readonly firstname_ru: string;

  @ApiProperty()
  readonly firstname_en: string;

  @ApiProperty()
  readonly lastname_ru: string;

  @ApiProperty()
  readonly lastname_en: string;

  @ApiProperty()
  readonly patronymic_ru: string;

  @ApiProperty()
  readonly patronymic_en: string;

  @ApiProperty()
  readonly position_id: string;

  @ApiProperty()
  readonly section_id: string;

  @ApiProperty()
  readonly state_id: string;

  @ApiProperty()
  readonly city_id: string;

  @ApiProperty()
  readonly nomination_id: string;

  @ApiProperty()
  readonly count_z: number;

  @ApiProperty()
  readonly description_ru: string;

  @ApiProperty()
  readonly description_en: string;

  @ApiProperty()
  readonly role: Role;

  @ApiProperty()
  readonly img: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.tab_number = user.tab_number;
    this.firstname_ru = user.firstname_ru;
    this.firstname_en = user.firstname_en;
    this.lastname_ru = user.lastname_ru;
    this.lastname_en = user.lastname_en;
    this.patronymic_ru = user.patronymic_ru;
    this.patronymic_en = user.patronymic_en;
    this.position_id = user.position_id;
    this.section_id = user.section_id;
    this.state_id = user.state_id;
    this.city_id = user.city_id;
    this.nomination_id = user.nomination_id;
    this.description_ru = user.description_ru;
    this.description_en = user.description_en;
    this.role = user.role;
    this.img = user.img;
  }
}
