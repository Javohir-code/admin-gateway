import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { userMsUrl } from 'src/shared/constants/msUrls';
import { GRPC_USER_PACKAGE } from './constants';
import { AtStrategy, RtStrategy } from './strategies';
import { UserController } from './user.controller';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({}),
    ClientsModule.register([
      {
        name: GRPC_USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(
            process.cwd(),
            'node_modules/@padishah/toolbox/grpc/user.proto',
          ),
          url: userMsUrl,
          loader: {
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [AtStrategy, RtStrategy],
})
export class UserModule {}
