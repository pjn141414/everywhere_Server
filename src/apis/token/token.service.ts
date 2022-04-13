import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IPayload, IToken } from 'src/interfaces/token/IToken';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  verifyToken(token: string): IToken {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      switch (error.message) {
        case 'jwt must be provided':
          throw new BadRequestException('토큰이 전송되지 않았습니다.');

        case 'invalid signature':
        case 'invalid token':
        case 'jwt malformed':
          throw new UnauthorizedException('유효하지 않은 토큰입니다.');

        case 'jwt expired':
          throw new UnauthorizedException('만료된 토큰입니다.');

        default:
          throw new InternalServerErrorException('서버 오류');
      }
    }
  }

  generateAccessToken(id: string): string {
    const payload: IPayload = {
      id,
    };

    const options: JwtSignOptions = {
      expiresIn: '7h',
      issuer: 'everywhere',
      subject: 'accessToken',
    };

    return this.jwtService.sign(payload, options);
  };

  generateRefreshToken(id: string): string {
    const payload: IPayload = {
      id,
    };

    const options: JwtSignOptions = {
      expiresIn: '7d',
      issuer: 'everywhere',
      subject: 'refreshToken',
    };

    return this.jwtService.sign(payload, options);
  };

  refreshToken(refreshToken: string): string {
    const { id, issuer, subject }: IToken = this.verifyToken(refreshToken);

    if (issuer !== 'everywhere' || subject !== 'refreshToken ') {
      throw new BadRequestException('위조된 토큰');
    }

    return this.generateAccessToken(id);
  }
}