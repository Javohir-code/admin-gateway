import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_ORDER_PACKAGE } from './constants';
import { shopMsUrl } from 'src/shared/constants/msUrls';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: GRPC_ORDER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'shop',
          protoPath: join(
            process.cwd(),
            'node_modules/@padishah/toolbox/grpc/shop.proto',
          ),
          url: shopMsUrl,
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [CartController],
  providers: [],
})
export class CartModule {}
