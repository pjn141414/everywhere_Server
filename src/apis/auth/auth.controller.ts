import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoginRes } from 'src/interfaces/IAuth';
import BaseReponse from 'src/lib/response/base.response';
import { AuthService } from './auth.service';
import DauthLoginDto from './dto/DathLoginDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  @Post('/')
  @HttpCode(200)
  async getToken(@Body() code: DauthLoginDto) {
    const token: ILoginRes = await this.authService.dauthLogin(code);

    return new BaseReponse(200, 'success', token);
  }
}