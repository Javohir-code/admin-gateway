import { TranslationPage } from 'src/shared/interfaces/shared.interface';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOnePageDto {
  @ApiProperty()
  @IsNotEmpty()
  slug: string;

}
