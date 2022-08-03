import { ApiProperty } from '@nestjs/swagger';

export class GetOneDto {
  @ApiProperty()
  id: number;
}
