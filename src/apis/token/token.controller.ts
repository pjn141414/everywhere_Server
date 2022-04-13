import { Body, Controller, Get } from '@nestjs/common';
import BaseReponse from 'src/lib/response/base.response';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService
  ) { }

  @Get('/refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    const accessToken: string = this.tokenService.refreshToken(data.refreshToken);

    return new BaseReponse(200, '리프레쉬 토큰 발급 성공');
  }
}
