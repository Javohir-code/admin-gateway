import { ApiProperty } from '@nestjs/swagger';
import { StatusCategory } from '../../shared/enums/enum';

export class GetAllDto {
  @ApiProperty()
  type?: string;
  @ApiProperty()
  variantFields?: boolean;
  @ApiProperty()
  variantValues?: boolean;
  @ApiProperty()
  where?: {
    id?: string;
    height?: string;
    image?: string;
    length?: string;
    status?: StatusCategory;
    weight?: string;
    width?: string;
  };
}
