import { RegionModule } from './region/region.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistrictModule } from './district/district.module';
import { AppLoggerMiddleware } from './middlewares/request-logging';
import { CompanyModule } from './company/company.module';
import { AddressOwnerModule } from './addressOwner/addressOwner.module';
import { EmployeeModule } from './employee/employee.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { VariantFieldsModule } from './variantFields/variantFields.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DistrictModule,
    RegionModule,
    CompanyModule,
    AddressOwnerModule,
    WarehouseModule,
    EmployeeModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    VariantFieldsModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
