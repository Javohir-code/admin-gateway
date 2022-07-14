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
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { jsonValueToProto } from 'src/shared/utils';
import { RegionControllerInterface } from './interfaces/region.interface';
import { ParamsId } from 'src/shared/interfaces/shared.interface';
import { GRPC_REGION_PACKAGE } from './constants';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './dto/region.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { DeleteApiResponse } from 'src/shared/dto';

@Controller('regions')
export class RegionController implements OnModuleInit {
  private regionService: RegionControllerInterface;

  constructor(@Inject(GRPC_REGION_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.regionService =
      this.client.getService<RegionControllerInterface>('RegionController');
  }

  @ApiBody({ type: CreateRegionDto })
  @ApiResponse({ type: Region })
  @Post('/')
  async create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
    const oldTranslations = createRegionDto.translations;
    createRegionDto.translations = jsonValueToProto(
      createRegionDto.translations,
    ).structValue;

    const response = await lastValueFrom(
      this.regionService.create(createRegionDto),
    );

    response.translations = oldTranslations;
    return response;
  }

  @ApiBody({ type: UpdateRegionDto })
  @ApiResponse({ type: Region })
  @Put('/:id')
  async update(
    @Param() params: ParamsId,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const oldTranslations = updateRegionDto.translations;
    updateRegionDto.translations = jsonValueToProto(
      updateRegionDto.translations,
    ).structValue;

    const response = await lastValueFrom(
      this.regionService.update({ ...updateRegionDto, ...{ id: params.id } }),
    );

    response.translations = oldTranslations;
    return response;
  }

  @Delete('/:id')
  @ApiResponse({ type: DeleteApiResponse })
  async delete(@Param() params: ParamsId): Promise<{ success: boolean }> {
    const response = await lastValueFrom(
      this.regionService.delete({ id: params.id }),
    );
    return response;
  }
}
