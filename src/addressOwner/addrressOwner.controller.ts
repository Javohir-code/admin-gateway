import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddressOwnerInterface } from './interfaces/addressOwner.interface';
import { GRPC_ADDRESS_OWNER_PACKAGE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { AddressOwnerDto } from './dto/addressOwner.dto';
import { lastValueFrom } from 'rxjs';
import { GetAllDto } from './dto/get.all.dto';
import { GetOneDto } from './dto/get.one.dto';

@Controller('address-owner')
export class AddressOwnerController implements OnModuleInit {
  private addressService: AddressOwnerInterface;

  constructor(@Inject(GRPC_ADDRESS_OWNER_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.addressService =
      this.client.getService<AddressOwnerInterface>('AddressService');
  }

  @Get('/getAll')
  @ApiResponse({ type: [AddressOwnerDto] })
  async getAll(@Query() query?: GetAllDto): Promise<any> {
    return lastValueFrom(this.addressService.GetAll({ query })).catch((r) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'error',
          message: 'Not found this id',
        },
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Get('/getOne/:id')
  async getOne(@Param() param?: GetOneDto): Promise<AddressOwnerDto> {
    return lastValueFrom(this.addressService.GetOne({ id: param.id })).catch(
      (r) => {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'error',
            message: 'Not found this id',
          },
          HttpStatus.NOT_FOUND,
        );
      },
    );
  }

  @Post('/addNew')
  @ApiResponse({ type: AddressOwnerDto })
  async AddNew(@Body() body?: AddressOwnerDto): Promise<any> {
    return lastValueFrom(
      this.addressService.AddNew({
        address: body,
      }),
    ).catch((r) => {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'error',
          message: 'Not found this id',
        },
        HttpStatus.NOT_FOUND,
      );
    });
  }

  @Put('/update/:id')
  @ApiResponse({ type: AddressOwnerDto })
  async Update(
    @Param('id') id: number,
    @Body() body: AddressOwnerDto,
  ): Promise<any> {
    return lastValueFrom(
      this.addressService.Update({ id, address: body }),
    ).catch((r) => {
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

  @Delete('/delete/:id')
  @ApiResponse({})
  async Delete(@Param('id') id: number): Promise<any> {
    return lastValueFrom(this.addressService.Delete({ id })).catch((r) => {
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
