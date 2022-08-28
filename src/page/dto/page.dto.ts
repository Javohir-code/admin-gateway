import { ApiProperty } from '@nestjs/swagger';
import { TranslationPage } from 'src/shared/interfaces/shared.interface';

export class Page {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  translations: TranslationPage;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  __v?: number;
}
