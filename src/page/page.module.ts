import { helperMsUrl } from '../shared/constants/msUrls';
import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_PAGE_PACKAGE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC_PAGE_PACKAGE,
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
  controllers: [PageController],
  providers: [],
})
export class PageModule {}
