import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, IsNumber, IsBoolean } from 'class-validator';
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
  @IsBoolean()
  readonly is_active: boolean;
}
