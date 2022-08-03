/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CompanyStatus } from '../../shared/enums/enum';
import { IsOptional } from 'class-validator';

export class WarehouseDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsOptional()
  addressId: number;

  @ApiProperty()
  @IsOptional()
  companyId: number;
}
