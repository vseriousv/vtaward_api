import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../shared/enum/role';
import { StateDto } from '../../state/dto/state.dto';
import { IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly tabNumber: string;

  @ApiProperty()
  readonly firstnameRu: string;

  @ApiProperty()
  readonly firstnameEn: string;

  @ApiProperty()
  readonly lastnameRu: string;

  @ApiProperty()
  readonly lastnameEn: string;

  @ApiProperty()
  readonly patronymicRu: string;

  @ApiProperty()
  readonly patronymicEn: string;

  @ApiProperty()
  readonly stateId: number;

  @ApiProperty()
  readonly role: Role;

  @ApiProperty()
  readonly img: string;

  @ApiProperty()
  readonly positionName: string;

  @ApiProperty()
  readonly cityName: string;

  @ApiProperty()
  readonly sectionName: string;

  @ApiProperty()
  readonly positionNameEng: string;

  @ApiProperty()
  readonly cityNameEng: string;

  @ApiProperty()
  readonly sectionNameEng: string;

  @ApiProperty()
  readonly passwordText: string;

  @ApiProperty()
  readonly state: StateDto;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.tabNumber = user.tabNumber;
    this.firstnameRu = user.firstnameRu;
    this.firstnameEn = user.firstnameEn;
    this.lastnameRu = user.lastnameRu;
    this.lastnameEn = user.lastnameEn;
    this.patronymicRu = user.patronymicRu;
    this.patronymicEn = user.patronymicEn;
    this.stateId = user.stateId;
    this.state = user.state;
    this.role = user.role;
    this.img = user.img;
    this.positionName = user.positionName;
    this.cityName = user.cityName;
    this.sectionName = user.sectionName;
    this.positionNameEng = user.positionNameEng;
    this.cityNameEng = user.cityNameEng;
    this.sectionNameEng = user.sectionNameEng;
    this.passwordText = user.passwordText;
  }
}
