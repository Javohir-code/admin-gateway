import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetOneDto {
  @ApiProperty()
  @IsOptional()
  variantValues: boolean;

  @ApiProperty()
  @IsOptional()
  variantFields: boolean;
}
