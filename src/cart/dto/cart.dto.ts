import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CartDto {
  @ApiProperty()
  @IsOptional()
  name: string;
}
