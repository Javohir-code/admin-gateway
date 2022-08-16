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
import { OrderControllerInterface } from './interfaces/cart.interface';
import { GRPC_ORDER_PACKAGE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { CartDto } from './dto/cart.dto';
import { lastValueFrom } from 'rxjs';
import { GetAllDto } from './dto/get.all.dto';
import { GetOneDto } from './dto/get.one.dto';
import { LangEnum } from '../shared/enums/enum';
import { Metadata } from '@grpc/grpc-js';

@Controller('cart')
export class CartController implements OnModuleInit {
  private cartService: OrderControllerInterface;

  constructor(@Inject(GRPC_ORDER_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.cartService =
      this.client.getService<OrderControllerInterface>('CartService');
  }

  @Get('/getAll')
  @ApiResponse({ type: [CartDto] })
  async getAll(
    @Body() body: GetAllDto,
    @Headers('lang') lang: LangEnum,
  ): Promise<CartDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.cartService.GetAll(body, metadata)).catch((e) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'error',
          message: e.message,
        },
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get('/getOne/:id')
  async getOne(
    @Param('id') id: string,
    @Body() body: GetOneDto,
    @Headers('lang') lang?: LangEnum,
  ): Promise<CartDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(
      this.cartService.GetOne({ id:id, ...body }, metadata),
    ).catch((e) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'error',
          message: e.message,
        },
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Post('/addNew')
  @ApiResponse({ type: [CartDto] })
  async AddNew(
    @Body() body?: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.cartService.AddNew(body)).catch((e) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'error',
          message: e.message,
        },
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Put('/update/:id')
  @ApiResponse({ type: CartDto })
  async Update(@Param('id') id: number, @Body() body: CartDto): Promise<any> {
    return lastValueFrom(this.cartService.Update({ id, ...body })).catch(
      (e) => {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'error',
            message: e.message,
          },
          HttpStatus.NOT_FOUND,
        );
      },
    );
  }

  @Delete('/delete/:id')
  @ApiResponse({})
  async Delete(@Param('id') id: number): Promise<any> {
    return lastValueFrom(this.cartService.Delete({ id })).catch((r) => {
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
