import { IsString, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNominationOrderDto {

  @ApiProperty()
  @IsInt()
  readonly userId: number;

  @ApiProperty()
  @IsInt()
  readonly userFrom: number;

  @ApiProperty()
  @IsInt()
  readonly nominationId: number;

  @ApiProperty()
  @IsString()
  readonly textRu: string;

  @ApiProperty()
  @IsString()
  readonly textEn: string;

  @ApiProperty()
  @IsBoolean()
  readonly public: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly isSelected: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly isNew: boolean;
}