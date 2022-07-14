import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_DISTRICT_PACKAGE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC_DISTRICT_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'app',
          protoPath: join(process.cwd(), '../helper-proto/app.proto'),
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [DistrictController],
  providers: [],
})
export class DistrictModule {}
