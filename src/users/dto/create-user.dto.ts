import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/enum/role';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly tabNumber: string;

  @ApiProperty()
  @IsString()
  readonly firstnameRu: string;

  @ApiProperty()
  @IsString()
  readonly firstnameEn: string;

  @ApiProperty()
  @IsString()
  readonly lastnameRu: string;

  @ApiProperty()
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
  readonly passwordText: string;
}
