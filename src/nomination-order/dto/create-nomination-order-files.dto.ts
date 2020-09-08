import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNominationOrderFilesDto {
  @ApiProperty()
  @IsString()
  readonly filePath: string;

  @ApiProperty()
  @IsInt()
  readonly nominationOrderId: number;
}