import { helperMsUrl } from './../shared/constants/msUrls';
import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_REGION_PACKAGE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC_REGION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'app',
          protoPath: join(
            process.cwd(),
            'node_modules/@padishah/toolbox/grpc/app.proto',
          ),
          url: helperMsUrl,
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [RegionController],
  providers: [],
})
export class RegionModule {}
