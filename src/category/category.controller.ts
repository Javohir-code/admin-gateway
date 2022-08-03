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
import { CategoryControllerInterface } from './interfaces/category.interface';
import { GRPC_PRODUCT_PACKAGE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { lastValueFrom } from 'rxjs';
import { GetAllDto } from './dto/get.all.dto';
import { GetOneDto } from './dto/get.one.dto';
import { LangEnum } from '../shared/enums/enum';
import { Metadata } from '@grpc/grpc-js';

@Controller('category')
export class CategoryController implements OnModuleInit {
  private categoryService: CategoryControllerInterface;

  constructor(@Inject(GRPC_PRODUCT_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.categoryService =
      this.client.getService<CategoryControllerInterface>('CategoryService');
    console.log(this.categoryService);
  }

  @Get('/getAll')
  @ApiResponse({ type: [CategoryDto] })
  async getAll(
    @Body() body: GetAllDto,
    @Headers('lang') lang: LangEnum,
  ): Promise<CategoryDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.categoryService.GetCategories(body, metadata));
  }

  @Get('/getOne/:id')
  async getOne(
    @Param('id') id: string,
    @Body() body: GetOneDto,
    @Headers('lang') lang?: LangEnum,
  ): Promise<CategoryDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(
      this.categoryService.GetCategory({ id, ...body }, metadata),
    );
  }

  @Post('/addNew')
  @ApiResponse({ type: [CategoryDto] })
  async AddNew(
    @Body() body?: { address: any; company: any },
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(
      this.categoryService.Create({
        address: body.address,
        company: body.company,
      }),
    );
  }

  @Put('/update/:id')
  @ApiResponse({ type: CategoryDto })
  async Update(
    @Param('id') id: number,
    @Body() body: CategoryDto,
  ): Promise<any> {
    return lastValueFrom(this.categoryService.Update({ id, company: body }));
  }

  @Delete('/delete/:id')
  @ApiResponse({})
  async Delete(@Param('id') id: number): Promise<any> {
    return lastValueFrom(this.categoryService.Delete({ id })).catch((r) => {
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
