import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, IsBoolean, IsEmail } from 'class-validator';

export class СhangePasswordDto {
  @ApiProperty()
  @IsString()
  readonly tabNumber: string;
     
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly passwordOld: string;

  @ApiProperty()
  @IsOptional()
  readonly passwordNew: string;
}
