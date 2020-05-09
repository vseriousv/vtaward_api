import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/enum/role';
import { Column } from 'sequelize-typescript';
import { PositionDto } from '../../position/dto/position.dto';
import { SectionDto } from '../../section/dto/section.dto';
import { StateDto } from '../../state/dto/state.dto';
import { CityDto } from '../../city/dto/city.dto';
import { NominationDto } from '../../nomination/dto/nomination.dto';

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
  readonly position_id: number;

  @ApiProperty()
  readonly section_id: number;

  @ApiProperty()
  readonly state_id: number;

  @ApiProperty()
  readonly city_id: number;

  @ApiProperty()
  readonly nomination_id: number;

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

  @ApiProperty()
  readonly position: PositionDto;

  @ApiProperty()
  readonly section: SectionDto;

  @ApiProperty()
  readonly state: StateDto;

  @ApiProperty()
  readonly city: CityDto;

  @ApiProperty()
  readonly nomination: NominationDto;

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
    this.count_z = user.count_z;
    this.description_ru = user.description_ru;
    this.description_en = user.description_en;
    this.role = user.role;
    this.img = user.img;
    this.position = user.position;
    this.section = user.section;
    this.state = user.state;
    this.city = user.city;
    this.nomination = user.nomination;
  }
}
