/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_WAREHOUSE_PACKAGE } from './constants';
import { ownerMsUrl } from 'src/shared/constants/msUrls';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: GRPC_WAREHOUSE_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'company',
          protoPath: join(process.cwd(), 'node_modules/@padishah/toolbox/grpc/company.proto'),
          url: ownerMsUrl,
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [WarehouseController],
  providers: [],
})
export class WarehouseModule { }
