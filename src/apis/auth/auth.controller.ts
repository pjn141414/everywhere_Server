import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoginRes } from 'src/interfaces/auth/IAuth';
import BaseReponse from 'src/lib/response/base.response';
import { AuthService } from './auth.service';
import DauthLoginDto from './dto/DauthLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  @Get('/')
  @HttpCode(200)
  async dodamLoginUrl() {
    const clientId: string = this.configService.get<string>('client_id');

    return new BaseReponse(200, '로그인 url 조회 성공',
      `http://dauth.b1nd.com/login?response_type=code&client_id=${clientId}&state=null&redirect_uri=http://localhost:8000`);
  }

  @Post('/')
  @HttpCode(200)
  async dauthLogin(@Body() code: DauthLoginDto) {
    const token: ILoginRes = await this.authService.dauthLogin(code);

    return new BaseReponse(200, '로그인 성공', token);
  }
}