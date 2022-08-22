import { lastValueFrom } from 'rxjs';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  OnModuleInit,
  Get,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { jsonValueToProto, structProtoToJson } from 'src/shared/utils';
import { PageControllerInterface } from './interfaces/page.interface';
import { ParamsId } from 'src/shared/interfaces/shared.interface';
import { GRPC_PAGE_PACKAGE } from './constants';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Page } from './dto/page.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { DeleteApiResponse } from 'src/shared/dto';
import { GetOnePageDto } from './dto/get-one-page.dto';

@Controller('page')
export class PageController implements OnModuleInit {
  private regionService: PageControllerInterface;

  constructor(@Inject(GRPC_PAGE_PACKAGE) private client: ClientGrpc) {}

  getField(data, fliedName) {
    return data[fliedName];
  }

  onModuleInit() {
    this.regionService =
      this.client.getService<PageControllerInterface>('PageController');
  }

  @ApiBody({ type: CreatePageDto })
  @ApiResponse({ type: Page })
  @Get('/')
  async getAll(): Promise<Page[]> {
    const response = await lastValueFrom(this.regionService.GetAll({}));
    console.log(response);
    return this.getField(response, 'data').map((e) => {
      return {
        ...e,
        translations: structProtoToJson(e.translations),
      };
    });
  }

  @ApiBody({ type: GetOnePageDto })
  @ApiResponse({ type: Page })
  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<Page> {
    const response = await lastValueFrom(this.regionService.FindById({ id }));
    return {
      ...response,
      translations: structProtoToJson(this.getField(response, 'translations')),
    };
  }

  @ApiBody({ type: CreatePageDto })
  @ApiResponse({ type: Page })
  @Post('/')
  async create(@Body() createRegionDto: CreatePageDto): Promise<Page> {
    const oldTranslations = createRegionDto.translations;
    createRegionDto.translations = jsonValueToProto(
      createRegionDto.translations,
    ).structValue;

    const response = await lastValueFrom(
      this.regionService.Create(createRegionDto),
    );

    response.translations = oldTranslations;
    return response;
  }

  @ApiBody({ type: UpdateRegionDto })
  @ApiResponse({ type: Page })
  @Put('/:id')
  async update(
    @Param() params: ParamsId,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Page> {
    const oldTranslations = updateRegionDto.translations;
    updateRegionDto.translations = jsonValueToProto(
      updateRegionDto.translations,
    ).structValue;

    const response = await lastValueFrom(
      this.regionService.Update({ ...updateRegionDto, ...{ id: params.id } }),
    );

    response.translations = oldTranslations;
    return response;
  }

  @Delete('/:id')
  @ApiResponse({ type: DeleteApiResponse })
  async delete(@Param() params: ParamsId): Promise<{ success: boolean }> {
    const response = await lastValueFrom(
      this.regionService.Delete({ id: params.id }),
    );
    return response;
  }
}
