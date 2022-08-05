import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetOneDto {
  @ApiProperty()
  @IsOptional()
  brand: boolean;

  @ApiProperty()
  @IsOptional()
  categories: boolean;

  @ApiProperty()
  @IsOptional()
  characteristics: boolean;

  @ApiProperty()
  @IsOptional()
  variants: boolean;
}
