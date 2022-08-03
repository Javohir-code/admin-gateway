import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../../shared/enums/enum';

export class GetAllDto {
  @ApiProperty()
  type?: string;
  @ApiProperty()
  brand?: boolean;
  @ApiProperty()
  categories?: boolean;
  @ApiProperty()
  characteristics?: boolean;
  @ApiProperty()
  variants?: boolean;
  @ApiProperty()
  where?: {
    companyId?: string;
    height?: string;
    image?: string;
    isPreorder?: boolean;
    isSale?: boolean;
    isTop?: boolean;
    length?: string;
    minAge?: number;
    status?: ProductStatus;
    weight?: string;
    width?: string;
  };
}
