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
import { VariantFieldsInterface } from './interfaces/variantFields.interface';
import { GRPC_PRODUCT_PACKAGE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { VariantFieldsDto } from './dto/variantFields.dto';
import { lastValueFrom } from 'rxjs';
import { LangEnum } from '../shared/enums/enum';
import { Metadata } from '@grpc/grpc-js';

@Controller('variant-fields')
export class VariantFieldsController implements OnModuleInit {
  private variantFieldsService: VariantFieldsInterface;

  constructor(@Inject(GRPC_PRODUCT_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.variantFieldsService = this.client.getService<VariantFieldsInterface>(
      'VariantFieldService',
    );
  }

  @Get('/getAll')
  @ApiResponse({ type: [VariantFieldsDto] })
  async getAll(
    @Body() body: any,
    @Headers('lang') lang: LangEnum,
  ): Promise<VariantFieldsDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.variantFieldsService.GetAll(body, metadata));
  }

  @Get('/getOne')
  async getOne(
    // @Param('id') id: string,
    @Body() body: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<VariantFieldsDto> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.variantFieldsService.GetOne(body, metadata));
  }

  @Post('/addNew')
  @ApiResponse({ type: [VariantFieldsDto] })
  async AddNew(
    @Body() body?: any,
    @Headers('lang') lang?: LangEnum,
  ): Promise<any> {
    const metadata = new Metadata();
    metadata.add('lang', `${lang}`);
    return lastValueFrom(this.variantFieldsService.AddNew(body, metadata));
  }

  @Put('/update/:id')
  @ApiResponse({ type: VariantFieldsDto })
  async Update(@Param('id') id: string, @Body() body: any): Promise<any> {
    return lastValueFrom(this.variantFieldsService.Update({ id, ...body }));
  }

  @Delete('/delete/:id')
  @ApiResponse({})
  async Delete(@Param('id') id: string): Promise<any> {
    return lastValueFrom(this.variantFieldsService.Delete({ id })).catch(
      (r) => {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'error',
            message: r.message,
          },
          HttpStatus.NOT_FOUND,
        );
      },
    );
  }
}
