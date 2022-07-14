import { Translation } from 'src/shared/interfaces/shared.interface';
import { EntityRecordStatus } from 'src/shared/enums/enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: EntityRecordStatus })
  status: EntityRecordStatus;

  @ApiProperty()
  translations: Translation;
}
