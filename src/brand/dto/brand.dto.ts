import { ApiProperty } from '@nestjs/swagger';
import { StatusBrand } from '../../shared/enums/enum';
import { IsOptional } from 'class-validator';

export class BrandDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  status: StatusBrand;
  // @Prop({ type: String, required: true })
  // image: string;
  // @Prop({ type: String, required: true })
  // name: string;
  // @Prop({ type: Object, required: true })
  // translation: {
  //   [key: string]: { name: string; description: string };
  // };
  // @Prop({
  //   type: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Product',
  //     },
  //   ],
  // })
  // products: Product[];
}
