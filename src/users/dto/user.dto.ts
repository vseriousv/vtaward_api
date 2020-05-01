import { User } from './../user.entity';
// import { Gender } from './../../shared/enum/gender';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/enum/role';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name_ru: string;

  @ApiProperty()
  readonly name_en: string;

  @ApiProperty()
  readonly position_ru: string;

  @ApiProperty()
  readonly position_en: string;

  @ApiProperty()
  readonly section_ru: string;

  @ApiProperty()
  readonly section_en: string;

  @ApiProperty()
  readonly state_ru: string;

  @ApiProperty()
  readonly state_en: string;

  @ApiProperty()
  readonly city_ru: string;

  @ApiProperty()
  readonly city_en: string;

  @ApiProperty()
  readonly nomination_ru: string;

  @ApiProperty()
  readonly nomination_en: string;

  @ApiProperty()
  readonly count_z: string;

  @ApiProperty()
  readonly description_ru: string;

  @ApiProperty()
  readonly description_en: string;

  @ApiProperty()
  readonly role: Role;


  constructor(user: User) {
    this.email = user.email;
    this.name_ru = user.name_ru;
    this.name_en = user.name_en;
    this.position_ru = user.position_ru;
    this.position_en = user.position_en;
    this.section_ru = user.section_ru;
    this.section_en = user.section_en;
    this.state_ru = user.state_ru;
    this.state_en = user.state_en;
    this.city_ru = user.city_ru;
    this.city_en = user.city_en;
    this.nomination_ru = user.nomination_ru;
    this.nomination_en = user.nomination_en;
    this.description_ru = user.description_ru;
    this.description_en = user.description_en;
    this.role = user.role;
  }
}
