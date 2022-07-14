import { ApiProperty } from '@nestjs/swagger';

export class DeleteApiResponse {
  @ApiProperty()
  success: boolean;
}
