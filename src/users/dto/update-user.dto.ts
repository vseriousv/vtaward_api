import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, IsEmail } from 'class-validator';
import { Role } from '../../shared/enum/role';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly tabNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstnameRu: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstnameEn: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastnameRu: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastnameEn: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly patronymicRu: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly patronymicEn: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly stateId: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly img: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly positionName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly cityName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly sectionName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly positionNameEng: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly cityNameEng: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly sectionNameEng: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly passwordText: string;
}
