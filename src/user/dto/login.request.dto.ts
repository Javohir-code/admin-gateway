import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  size: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  timeout: number;
}
