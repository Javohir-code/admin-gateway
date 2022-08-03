import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductControllerInterface } from './interfaces/product.interface';
import { GRPC_PRODUCT_PACKAGE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { lastValueFrom } from 'rxjs';
import { GetAllDto } from './dto/get.all.dto';
import { GetOneDto } from './dto/get.one.dto';
import { LangEnum } from '../shared/enums/enum';
import { Metadata } from '@grpc/grpc-js';

@Controller('product')
export class ProductController implements OnModuleInit {
  private productService: ProductControllerInterface;

  constructor(@Inject(GRPC_PRODUCT_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductControllerInterface>('ProductService');
  }

  @Get('/getAll')
  @ApiResponse({ type: [ProductDto] })
  async getAll(
    @Body() body: GetAllDto,
    @Headers('lang') lang: LangEnum,
  ): Promise<ProductDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.productService.GetAll(body, metadata));
  }

  @Get('/getOne/:id')
  async getOne(
    @Param('id') id: string,
    @Body() body: GetOneDto,
    @Headers('lang') lang?: LangEnum,
  ): Promise<ProductDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.productService.GetOne({ id, ...body }, metadata));
  }

  @Post('/addNew')
  @ApiResponse({ type: [ProductDto] })
  async AddNew(
    @Body() body?: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.productService.Create(body, metadata));
  }

  @Put('/update/:id')
  @ApiResponse({ type: ProductDto })
  async Update(@Param('id') id: string, @Body() body: any): Promise<any> {
    return lastValueFrom(this.productService.Update({ id, ...body }));
  }

  @Delete('/delete/:id')
  @ApiResponse({})
  async Delete(@Param('id') id: string): Promise<any> {
    return lastValueFrom(this.productService.Delete({ id })).catch((r) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'error',
          message: r.message,
        },
        HttpStatus.NOT_FOUND,
      );
    });
  }
}
