import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, IsNumber } from 'class-validator';
// import { Role } from '../../shared/enum/role';

export class UpdateVotingDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly year: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly type_voting: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly is_active: boolean;
}
