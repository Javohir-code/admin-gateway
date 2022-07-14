import { RegionModule } from './region/region.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistrictModule } from './district/district.module';
import { AppLoggerMiddleware } from './middlewares/request-logging';

@Module({
  imports: [ConfigModule.forRoot(), DistrictModule, RegionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
