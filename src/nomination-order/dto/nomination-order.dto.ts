import { ApiProperty } from '@nestjs/swagger';
import { NominationOrderEntity } from '../nomination-order.entity';
import { UserDto } from '../../users/dto/user.dto';
import { NominationDto } from '../../nomination/dto/nomination.dto';
import { NominationOrderFilesDto } from './nomination-order-files.dto';
import { IsOptional } from 'class-validator';


export class NominationOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly nominationId: number;

  @ApiProperty()
  readonly textRu: string;

  @ApiProperty()
  readonly textEn: string;

  @ApiProperty()
  readonly user: UserDto;

  @ApiProperty()
  readonly nomination: NominationDto;

  @ApiProperty()
  @IsOptional()
  readonly files?: NominationOrderFilesDto[];

  constructor( nominationOrderEntity: NominationOrderEntity ) {
    this.id = nominationOrderEntity.id;
    this.userId = nominationOrderEntity.userId;
    this.nominationId = nominationOrderEntity.nominationId;
    this.textRu = nominationOrderEntity.textRu;
    this.textEn = nominationOrderEntity.textEn;
    this.user = nominationOrderEntity.user;
    this.nomination = nominationOrderEntity.nomination;
    if (nominationOrderEntity.files) {
      this.files = nominationOrderEntity.files.map(
        file => new NominationOrderFilesDto(file),
      );
    }
  }

}