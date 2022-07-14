import { ApiProperty } from '@nestjs/swagger';
import { Region } from 'src/region/dto/region.dto';
import { EntityRecordStatus } from 'src/shared/enums/enum';
import { Translation } from 'src/shared/interfaces/shared.interface';

export class District {
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

  @ApiProperty()
  region: Region;
}
