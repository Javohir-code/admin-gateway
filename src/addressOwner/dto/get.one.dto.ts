import { ApiProperty } from '@nestjs/swagger';

export class GetOneDto {
  @ApiProperty()
  // @IsOptional()
  id: number;
}
