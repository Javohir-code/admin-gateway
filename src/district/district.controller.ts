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
import { jsonValueToProto, structProtoToJson } from 'src/shared/utils';
import { DistrictControllerInterface } from './interfaces/district.interface';
import { ParamsId } from 'src/shared/interfaces/shared.interface';
import { GRPC_DISTRICT_PACKAGE } from './constants';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { District } from './dto/district.dto';
import { DeleteApiResponse } from 'src/shared/dto';

@Controller('districts')
export class DistrictController implements OnModuleInit {
  private districtService: DistrictControllerInterface;

  constructor(@Inject(GRPC_DISTRICT_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.districtService =
      this.client.getService<DistrictControllerInterface>('DistrictController');
  }

  @Post('/')
  @ApiBody({ type: CreateDistrictDto })
  @ApiResponse({ type: District })
  async create(
    @Body() createDistrictDto: CreateDistrictDto,
  ): Promise<District> {
    const oldTranslations = createDistrictDto.translations;
    createDistrictDto.translations = jsonValueToProto(
      createDistrictDto.translations,
    ).structValue;

    const response = await lastValueFrom(
      this.districtService.create(createDistrictDto),
    );

    response.translations = oldTranslations;

    if (response?.region?.translations) {
      response.region.translations = structProtoToJson(
        response.region.translations,
      );
    }

    return response;
  }

  @Put('/:id')
  @ApiBody({ type: UpdateDistrictDto })
  @ApiResponse({ type: District })
  async update(
    @Param() params: ParamsId,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    updateDistrictDto.translations = jsonValueToProto(
      updateDistrictDto.translations,
    ).structValue;

    const response = await lastValueFrom(
      this.districtService.update({
        ...updateDistrictDto,
        ...{ id: params.id },
      }),
    );

    response.translations = structProtoToJson(response.translations);

    if (response?.region?.translations) {
      response.region.translations = structProtoToJson(
        response.region.translations,
      );
    }

    return response;
  }

  @Delete('/:id')
  @ApiResponse({ type: DeleteApiResponse })
  async delete(@Param() params: ParamsId): Promise<{ success: boolean }> {
    const response = await lastValueFrom(
      this.districtService.delete({ id: params.id }),
    );
    return response;
  }
}
