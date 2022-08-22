import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class OrderDto {
  @ApiProperty()
  @IsOptional()
  name: string;
}
