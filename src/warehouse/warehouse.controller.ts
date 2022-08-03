/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { WarehouseInterface } from "./interfaces/warehouse.interface";
import { GRPC_WAREHOUSE_PACKAGE } from "./constants";
import { ClientGrpc } from "@nestjs/microservices";
import { ApiResponse } from "@nestjs/swagger";
import { WarehouseDto } from "./dto/warehouse.dto";
import { lastValueFrom } from "rxjs";
import { GetAllDto } from "./dto/get.all.dto";
import { GetOneDto } from "./dto/get.one.dto";
import { WarehouseStatus } from "../shared/enums/enum";

@Controller("warehouse")
export class WarehouseController implements OnModuleInit {
  private warehouseService: WarehouseInterface;

  constructor(@Inject(GRPC_WAREHOUSE_PACKAGE) private client: ClientGrpc) {
  }

  onModuleInit() {
    this.warehouseService =
      this.client.getService<WarehouseInterface>("WarehouseService");
  }

  @Get("/getAll")
  @ApiResponse({ type: [WarehouseDto] })
  async getAll(@Query() query?: GetAllDto): Promise<any> {
    return lastValueFrom(this.warehouseService.GetAll({ query }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: "Not found this id"
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Get("/getOne/:id")
  async getOne(@Param() param?: GetOneDto): Promise<WarehouseDto> {
    return lastValueFrom(this.warehouseService.GetOne({ id: param.id }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: "Not found this id"
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Post("/addNew")
  @ApiResponse({ type: [WarehouseDto] })
  async AddNew(@Body() body?: { address: any }): Promise<any> {
    return lastValueFrom(
      this.warehouseService.AddNew({
        warehouse: body
      })
    )
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: "Not found this id"
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Put("/update/:id")
  @ApiResponse({ type: WarehouseDto })
  async Update(@Param("id") id: number, @Body() body: WarehouseDto): Promise<any> {
    return lastValueFrom(this.warehouseService.Update({ id, warehouse: body }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Put("/update-status/:id/:status")
  @ApiResponse({ type: WarehouseDto })
  async UpdateStatusOnly(@Param("id") id: number, @Param("status") status: WarehouseStatus): Promise<any> {
    return lastValueFrom(this.warehouseService.UpdateStatusOnly({ id, status }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: r,
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Put("/inactive")
  @ApiResponse({ type: WarehouseDto })
  async Inactive(@Body() body: { ids: number[] }): Promise<any> {
    return lastValueFrom(this.warehouseService.Inactive({ warehouse: body.ids }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: r,
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Delete("/delete/:id")
  @ApiResponse({})
  async Delete(@Param("id") id: number): Promise<any> {
    return lastValueFrom(this.warehouseService.Delete({ id }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }
}
