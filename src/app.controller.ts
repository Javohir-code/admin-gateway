import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { signPublicUploadUrl } from '@padishah/toolbox/s3/server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sign-upload')
  signUpload(
    @Body('fileName') fileName: string,
    @Body('contentType') contentType: string,
  ) {
    return signPublicUploadUrl({
      fileName,
      contentType,
      bucket: 'padishah-storage',
      prefix: 'admin',
    });
  }
}
