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
  Query,
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
import {
  getField,
  getQuery,
  jsonValueToProto,
  structProtoToJson,
} from '../shared/utils';
import * as _ from 'lodash';

@Controller('category')
export class CategoryController implements OnModuleInit {
  private categoryService: CategoryControllerInterface;

  constructor(@Inject(GRPC_PRODUCT_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.categoryService =
      this.client.getService<CategoryControllerInterface>('CategoryService');
  }

  @Get('/getAll')
  @ApiResponse({ type: [CategoryDto] })
  async getAll(
    @Query() query: GetAllDto,
    // @Body() body: GetAllDto,
    @Headers('lang') lang: LangEnum,
  ): Promise<{ data: CategoryDto[] }> {
    const changedQuery = getQuery(query, [
      'height',
      'id',
      'image',
      'length',
      'status',
      'weight',
      'width',
      'parentId',
    ]);
    console.log(changedQuery);
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.categoryService.GetCategories(changedQuery, metadata),
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
    return response;
  }

  @Get('/tree')
  @ApiResponse({ type: [CategoryDto] })
  async getTree(@Headers('lang') lang: LangEnum): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.categoryService.GetTreeCategory({}, metadata),
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
    return {
      data: _.values(structProtoToJson(response.data)),
    };
  }

  @Get('/getOne/:id')
  async getOne(
    @Param('id') id: string,
    @Query() query: GetOneDto,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.categoryService.GetCategory({ id, ...query }, metadata),
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
    return {
      data: {
        ...response.data,
        translation: structProtoToJson(getField(response.data, 'translation')),
      },
    };
  }

  @Post('/addNew')
  @ApiResponse({ type: [CategoryDto] })
  async AddNew(
    @Body() body?: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);

    const oldTranslation = body.translation;
    body.translation = jsonValueToProto(body.translation).structValue;
    const response = await lastValueFrom(
      this.categoryService.AddNew({ ...body }),
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

    response.translation = oldTranslation;

    return response;
  }

  @Put('/update/:id')
  @ApiResponse({ type: CategoryDto })
  async Update(@Param('id') id: number, @Body() body: any): Promise<any> {
    const oldTranslation = body.translation;
    body.translation = jsonValueToProto(body.translation).structValue;
    console.log(body);
    const response = await lastValueFrom(
      this.categoryService.Update({ id, ...body }),
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

    response.data.translation = oldTranslation;

    return response;
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
