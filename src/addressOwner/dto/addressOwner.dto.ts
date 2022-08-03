/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CompanyStatus } from '../../shared/enums/enum';
import { IsOptional } from 'class-validator';

export class AddressOwnerDto {
  @ApiProperty()
  @IsOptional()
  latitude: string;

  @ApiProperty()
  @IsOptional()
  longitude: string;

  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  street: string;

  @ApiProperty()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsOptional()
  home: string;

  @ApiProperty()
  @IsOptional()
  apartment: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  @IsOptional()
  domofon: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsOptional()
  regionId: number;

  @ApiProperty()
  @IsOptional()
  districtId: number;

  @ApiProperty()
  @IsOptional()
  postalCode: string;
}
