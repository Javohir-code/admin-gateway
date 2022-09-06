import { jsonToStructProto } from './../shared/utils/index';
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
import { VariantInterface } from './interfaces/variant.interface';
import { GRPC_PRODUCT_PACKAGE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { VariantDto } from './dto/variant.dto';
import { lastValueFrom } from 'rxjs';
import { GetAllDto } from './dto/get.all.dto';
import { GetOneDto } from './dto/get.one.dto';
import { LangEnum } from '../shared/enums/enum';
import { Metadata } from '@grpc/grpc-js';
import { getQuery, jsonValueToProto } from '../shared/utils';

@Controller('variant')
export class VariantController implements OnModuleInit {
  private variantService: VariantInterface;

  constructor(@Inject(GRPC_PRODUCT_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.variantService =
      this.client.getService<VariantInterface>('VariantService');
  }

  @Post('/:id/add-image')
  async addImage(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.variantService.AddImage({ variantId: id, ...body }, metadata),
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
      data: response.data,
    };
  }

  @Put('/:variantId/update-image/:id')
  async updateImage(
    @Param('id') id: string,
    @Param('variantId') variantId: string,
    @Body() body: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.variantService.UpdateImage({ variantId, id, ...body }, metadata),
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
      data: response.data,
    };
  }

  @Delete('/:variantId/remove-image/:id')
  async removeImage(
    @Param('id') id: string,
    @Param('variantId') variantId: string,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.variantService.RemoveImage({ variantId, id }, metadata),
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
      data: response.data,
    };
  }

  @Get('/all')
  @ApiResponse({ type: [VariantDto] })
  async getVariants(
    @Query() query: GetAllDto,
    @Headers('lang') lang: LangEnum,
  ): Promise<{ data: VariantDto[] }> {
    const changedQuery = getQuery(query, [
      'height',
      'id',
      'productId',
      'image',
      'length',
      'status',
      'weight',
      'width',
      'parentId',
    ]);
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.variantService.GetAll(changedQuery, metadata),
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

  @Get('/:id')
  async getOne(
    @Param('id') id: string,
    @Query() query: GetOneDto,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const response = await lastValueFrom(
      this.variantService.GetOne({ id, ...query }, metadata),
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
      data: response.data,
    };
  }

  @Post('/add')
  @ApiResponse({ type: [VariantDto] })
  async AddNew(
    @Body() body?: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    const oldValues = body?.values;
    const newBody = {
      ...body,
      values: {
        ...(body?.values || {}),
        translation: jsonToStructProto(body.values?.translation),
      },
    };

    const response = await lastValueFrom(
      this.variantService.VariantAdd(newBody),
    ).catch((e) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'error',
          message: e.message,
        },
        HttpStatus.NOT_FOUND,
      );
    });
    return {
      data: {
        ...response.data,
        values: oldValues,
      },
    };
  }

  @Put('/update/:id')
  @ApiResponse({ type: VariantDto })
  async Update(@Param('id') id: number, @Body() body: any): Promise<any> {
    const oldTranslation = body.translation;
    body.translation = jsonValueToProto(body.translation).structValue;
    const response = await lastValueFrom(
      this.variantService.Update({ id, ...body }),
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
    return lastValueFrom(this.variantService.Delete({ id })).catch((r) => {
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
