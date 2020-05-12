import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
// import { Role } from '../../shared/enum/role';

export class UpdateFilesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly file_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly file_type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly file_src: string;
}
