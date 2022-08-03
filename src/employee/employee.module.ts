import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_WAREHOUSE_PACKAGE } from './constants';
import { ownerMsUrl } from "../shared/constants/msUrls";
console.log(ownerMsUrl);

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: GRPC_WAREHOUSE_PACKAGE,
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
  controllers: [EmployeeController],
  providers: [],
})
export class EmployeeModule {}
