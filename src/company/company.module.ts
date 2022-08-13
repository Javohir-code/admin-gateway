import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_COMPANY_PACKAGE } from './constants';
import { ownerMsUrl } from 'src/shared/constants/msUrls';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: GRPC_COMPANY_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'company',
          protoPath: join(
            process.cwd(),
            'node_modules/@padishah/toolbox/grpc/company.proto',
          ),
          url: ownerMsUrl,
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [CompanyController],
  providers: [],
})
export class CompanyModule { }
