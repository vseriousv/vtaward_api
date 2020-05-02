import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/enum/role';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly tab_number: number;

  @ApiProperty()
  readonly name_ru: string;

  @ApiProperty()
  readonly name_en: string;

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

  constructor(user: User) {
    this.email = user.email;
    this.name_ru = user.name_ru;
    this.name_en = user.name_en;
    this.tab_number = user.tab_number;
    this.position_id = user.position_id;
    this.section_id = user.section_id;
    this.state_id = user.state_id;
    this.city_id = user.city_id;
    this.nomination_id = user.nomination_id;
    this.description_ru = user.description_ru;
    this.description_en = user.description_en;
    this.role = user.role;
  }
}
