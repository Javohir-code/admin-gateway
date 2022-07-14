import { EntityRecordStatus } from './../../shared/enums/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Translation } from 'src/shared/interfaces/shared.interface';

export class Region {
  @ApiProperty()
  _id: string;

  @ApiProperty({ enum: EntityRecordStatus })
  status: EntityRecordStatus;

  @ApiProperty()
  translations: Translation;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  __v?: number;
}
