/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressOwnerController } from './addrressOwner.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_ADDRESS_OWNER_PACKAGE } from './constants';
import { ownerMsUrl } from 'src/shared/constants/msUrls';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: GRPC_ADDRESS_OWNER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'company',
          protoPath: join(process.cwd(), '../helper-proto/company.proto'),
          url: ownerMsUrl,
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [AddressOwnerController],
  providers: [],
})
export class AddressOwnerModule {}
