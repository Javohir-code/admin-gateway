import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_PRODUCT_PACKAGE } from './constants';
import { productMsUrl } from 'src/shared/constants/msUrls';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: GRPC_PRODUCT_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(
            process.cwd(),
            'node_modules/@padishah/toolbox/grpc/product.proto',
          ),
          url: productMsUrl,
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [BrandController],
  providers: [],
})
export class BrandModule { }
