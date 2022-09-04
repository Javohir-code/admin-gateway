import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { GRPC_USER_PACKAGE } from './constants';
import { LoginRequestDto } from './dto/login.request.dto';
import { PasswordDto } from './dto/password.details.dto';
import { CurrentUserRt } from './global/decorators/current-user-rt.decorator';
import { CurrentUser } from './global/decorators/current-user.decorator';
import { AtAuthGuard } from './guards/at-auth.guard';
import { RtAuthGuard } from './guards/rt-auth.guard';
import { UsersControllerInterface } from './user.interface';

@Controller('admin')
export class UserController implements OnModuleInit {
  private usersService: UsersControllerInterface;

  constructor(@Inject(GRPC_USER_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersControllerInterface>('UserController');
    console.log(this.usersService);
  }

  @Post('login')
  @ApiResponse({ type: LoginRequestDto })
  async Login(@Body() body: any): Promise<any> {
    return lastValueFrom(this.usersService.Login(body));
  }

  @Post('verify')
  async verifyTheNumber(@Body() body: any): Promise<any> {
    return lastValueFrom(
      this.usersService.VerifyTheNumber({
        msisdn: body.msisdn,
        code: body.code,
      }),
    );
  }

  @Post('forget-password')
  async forgetPassword(@Body('msisdn') msisdn: string): Promise<any> {
    return lastValueFrom(this.usersService.ForgetPassword({ msisdn }));
  }

  @Put('change-password')
  async changePassword(
    @Body('msisdn') msisdn: string,
    @Body('code') code: string,
    @Body() passwordDto: PasswordDto,
  ) {
    return lastValueFrom(
      this.usersService.ChangePassword({
        msisdn: msisdn,
        code: code,
        password: passwordDto,
      }),
    );
  }

  @Post('logout')
  @UseGuards(AtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logoutUser(@CurrentUser() user: any): Promise<any> {
    return lastValueFrom(this.usersService.LogoutUser({ user }));
  }

  @Put('add-password')
  @UseGuards(AtAuthGuard)
  async addPassword(
    @CurrentUser() user: any,
    @Body() passwordDto: PasswordDto,
  ): Promise<void> {
    return lastValueFrom(
      this.usersService.AddPassword({ user: user, password: passwordDto }),
    );
  }

  @Post('refresh')
  @UseGuards(RtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @CurrentUser() user: any,
    @CurrentUserRt('refreshToken') rt: string,
  ) {
    return lastValueFrom(
      this.usersService.RefreshTokens({ user: user, refreshToken: rt }),
    );
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<any> {
    return lastValueFrom(this.usersService.GetUserById({ userId }));
  }

  @Get('phone/:msisdn')
  async getUserByMsisdn(@Param('msisdn') msisdn: string): Promise<any> {
    return lastValueFrom(this.usersService.GetUserByMsisdn({ msisdn }));
  }

  @Post('assign/role')
  @UseGuards(AtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async assignRole(@Body() data: any): Promise<any> {
    return lastValueFrom(this.usersService.AssignRole({ role: data }));
  }

  @Get('list/roles')
  @UseGuards(AtAuthGuard)
  async getRoles(): Promise<any> {
    return lastValueFrom(this.usersService.GetRoles());
  }

  @Put('user-status')
  @UseGuards(AtAuthGuard)
  async updateStatus(@Body() data: any): Promise<any> {
    return lastValueFrom(this.usersService.UpdateStatus({ user: data }));
  }

  @Post('login/password')
  @HttpCode(HttpStatus.OK)
  async loginWithPassword(@Body() data: any): Promise<any> {
    return lastValueFrom(
      this.usersService.LoginWithPassword({
        login: data.login,
        password: data.password,
      }),
    );
  }

  @Post('register')
  async register(@Body() data: any): Promise<any> {
    return lastValueFrom(this.usersService.Register({ user: data }));
  }
}
