import { ApiProperty } from '@nestjs/swagger';
import { NominationOrderEntity } from '../entities/nomination-order.entity';
import { UserDto } from '../../users/dto/user.dto';
import { NominationDto } from '../../nomination/dto/nomination.dto';
import { NominationOrderFilesDto } from './nomination-order-files.dto';
import { IsOptional } from 'class-validator';


export class UpdateNominationOrderDto {

  @ApiProperty()
  @IsOptional()
  readonly userId?: number;

  @ApiProperty()
  @IsOptional()
  readonly userFrom?: number;

  @ApiProperty()
  @IsOptional()
  readonly nominationId?: number;

  @ApiProperty()
  @IsOptional()
  readonly textRu?: string;

  @ApiProperty()
  @IsOptional()
  readonly textEn?: string;

  @ApiProperty()
  @IsOptional()
  readonly public?: boolean;

  @ApiProperty()
  @IsOptional()
  readonly isSelected?: boolean;

  @ApiProperty()
  @IsOptional()
  readonly isNew?: boolean;

  @ApiProperty() 
  @IsOptional()
  readonly step2?: boolean;
}