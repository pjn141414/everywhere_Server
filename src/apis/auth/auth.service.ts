import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import User from 'src/entities/user';
import { ITokenReq } from 'src/interfaces/auth/IAuth';
import { TokenService } from '../token/token.service';
import DauthLoginDto from './dto/DauthLogin.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
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

    const getUser = await lastValueFrom(
      this.httpService.get(
        'http://open.dodam.b1nd.com/api/user',
        {
          headers: {
            Authorization: 'Bearer ' + getToken.data.access_token,
          },
        },
      )
    );

    let user: User | undefined = await this.userRepository.
      getUserById(getUser.data.uniqueId);

    const userData = getUser.data.data;
    if (user === undefined) {
      user = this.userRepository.create({
        id: userData.uniqueId,
        name: userData.name,
        email: userData.email,
        grade: userData.grade,
        class: userData.room,
        number: userData.number,
        accessLevel: userData.accessLevel,
        profileImage: userData.profileImage,
      });

      await this.userRepository.save(user);
    }

    const accessToken: string = this.tokenService.generateAccessToken(user.id);

    const refreshToken: string = this.tokenService.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  public getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }
};