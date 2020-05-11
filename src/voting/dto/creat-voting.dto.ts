import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVotingDto {
  @ApiProperty()
  @IsNumber()
  readonly year: number;

  @ApiProperty()
  @IsString()
  readonly type_voting: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly is_active: boolean;

}
