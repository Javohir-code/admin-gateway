/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { CompanyStatus, EmployeeStatus, WarehouseStatus } from "../../shared/enums/enum";
import { IsOptional } from "class-validator";

export class EmployeeDto {
  @ApiProperty()
  @IsOptional()
  position: string;

  @ApiProperty()
  @IsOptional()
  status: EmployeeStatus;

  @ApiProperty()
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsOptional()
  level: number;

  @ApiProperty()
  @IsOptional()
  name: string;
}
