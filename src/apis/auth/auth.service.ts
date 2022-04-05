import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import User from 'src/entities/user';
import { ILoginRes, ITokenReq } from 'src/interfaces/IAuth';
import DauthLoginDto from './dto/DathLoginDto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) { }

  /**
   * @description DAuth 로그인(토큰 발급/유저 조회)
   */
  //ILoginRes
  async dauthLogin(code: DauthLoginDto): Promise<any> {
    const data: ITokenReq = {
      code: code.code,
      client_id: this.configService.get<string>('CLIENT_ID'),
      client_secret: this.configService.get<string>('CLIENT_SECRET'),
    };

    const getToken = await lastValueFrom(
      this.httpService.post(
        'http://dauth.b1nd.com/api/token', // 요청 url
        data, // request
      )
    );

    const getUser = await this.httpService.get(
      'http://open.dodam.b1nd.com/api/user',
      {
        headers: {
          Authrization: 'Bearer ' + getToken.data.access_token,
        },
      },
    );


  }
}