import { Translation } from 'src/shared/interfaces/shared.interface';
import { EntityRecordStatus } from 'src/shared/enums/enum';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: EntityRecordStatus })
  @IsNotEmpty()
  status: EntityRecordStatus;

  @ApiProperty()
  @IsNotEmpty()
  translations: Translation;
}
