import { TranslationPage } from 'src/shared/interfaces/shared.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  translations: TranslationPage;
}
