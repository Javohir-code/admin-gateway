import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetOneDto {
  @ApiProperty()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsOptional()
  query: {
    status: string;
  };
}
