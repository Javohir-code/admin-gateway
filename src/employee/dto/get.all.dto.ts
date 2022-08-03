import { ApiProperty } from '@nestjs/swagger';
import { CompanyStatus } from '../../shared/enums/enum';

export class GetAllDto {
  @ApiProperty()
  // @IsOptional()
  status?: CompanyStatus;

  @ApiProperty()
  // @IsOptional()
  companyId?: number;
}
