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
import { EmployeeInterface } from "./interfaces/employee.interface";
import { GRPC_WAREHOUSE_PACKAGE } from "./constants";
import { ClientGrpc } from "@nestjs/microservices";
import { ApiResponse } from "@nestjs/swagger";
import { EmployeeDto } from "./dto/employee.dto";
import { lastValueFrom } from "rxjs";
import { GetAllDto } from "./dto/get.all.dto";
import { GetOneDto } from "./dto/get.one.dto";
import { WarehouseStatus } from "../shared/enums/enum";

@Controller("employee")
export class EmployeeController implements OnModuleInit {
  private employeeService: EmployeeInterface;

  constructor(@Inject(GRPC_WAREHOUSE_PACKAGE) private client: ClientGrpc) {
  }

  onModuleInit() {
    this.employeeService =
      this.client.getService<EmployeeInterface>("EmployeeService");
  }

  @Get("/getAll")
  @ApiResponse({ type: [EmployeeDto] })
  async getAll(@Query() query?: GetAllDto): Promise<any> {
    return lastValueFrom(this.employeeService.GetAll({ query }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Get("/getOne/:id")
  async getOne(@Param() param?: GetOneDto): Promise<EmployeeDto> {
    return lastValueFrom(this.employeeService.GetOne({ id: param.id }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: "Not found this id"
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Post("/addNew")
  @ApiResponse({ type: [EmployeeDto] })
  async AddNew(@Body() body?: any): Promise<any> {
    return lastValueFrom(
      this.employeeService.AddNew({
        employee: body
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
  @ApiResponse({ type: EmployeeDto })
  async Update(@Param("id") id: number, @Body() body: EmployeeDto): Promise<any> {
    return lastValueFrom(this.employeeService.Update({ id, employee: body }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Put("/update-status/:id/:status")
  @ApiResponse({ type: EmployeeDto })
  async UpdateStatus(@Param("id") id: number, @Param("status") status: WarehouseStatus): Promise<any> {
    return lastValueFrom(this.employeeService.UpdateStatus({ id, status }))
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
    return lastValueFrom(this.employeeService.Delete({ id }))
      .catch(r => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          error: "error",
          message: r.message
        }, HttpStatus.NOT_FOUND);
      });
  }
}
