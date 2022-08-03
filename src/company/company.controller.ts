/* eslint-disable prettier/prettier */
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
import { CompanyControllerInterface } from './interfaces/company.interface';
import { GRPC_OWNER_PACKAGE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyDto } from './dto/company.dto';
import { lastValueFrom } from 'rxjs';
import { GetAllDto } from './dto/get.all.dto';
import { GetOneDto } from './dto/get.one.dto';

@Controller('company')
export class CompanyController implements OnModuleInit {
  private companyService: CompanyControllerInterface;

  constructor(@Inject(GRPC_OWNER_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.companyService =
      this.client.getService<CompanyControllerInterface>('CompanyService');
    console.log(this.companyService);
  }

  @Get('/getAll')
  @ApiResponse({ type: [CompanyDto] })
  async getAll(@Query() query?: GetAllDto): Promise<CompanyDto> {
    return lastValueFrom(this.companyService.GetAll({ query }));
  }

  @Get('/getOne/:id')
  async getOne(@Param() param?: GetOneDto): Promise<CompanyDto> {
    return lastValueFrom(this.companyService.GetOne({ id: param.id }));
  }

  @Post('/addNew')
  @ApiResponse({ type: [CompanyDto] })
  async AddNew(@Body() body?: { address: any; company: any }): Promise<any> {
    return lastValueFrom(
      this.companyService.AddNew({
        address: body.address,
        company: body.company,
      }),
    );
  }

  @Put('/update/:id')
  @ApiResponse({ type: CompanyDto })
  async Update(@Param('id') id: number, @Body() body: CompanyDto): Promise<any> {
    return lastValueFrom(this.companyService.Update({ id, company: body }));
  }

  @Delete("/delete/:id")
  @ApiResponse({})
  async Delete(@Param("id") id: number): Promise<any> {
    console.log(id);
    
    return lastValueFrom(this.companyService.Delete({ id }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }
}
