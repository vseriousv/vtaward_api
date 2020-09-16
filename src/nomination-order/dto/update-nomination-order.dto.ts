import { ApiProperty } from '@nestjs/swagger';
import { NominationOrderEntity } from '../nomination-order.entity';
import { UserDto } from '../../users/dto/user.dto';
import { NominationDto } from '../../nomination/dto/nomination.dto';
import { NominationOrderFilesDto } from './nomination-order-files.dto';
import { IsOptional } from 'class-validator';


export class UpdateNominationOrderDto {

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly userFrom: number;

  @ApiProperty()
  readonly nominationId: number;

  @ApiProperty()
  readonly textRu: string;

  @ApiProperty()
  readonly textEn: string;

  @ApiProperty()
  readonly public: boolean;

}