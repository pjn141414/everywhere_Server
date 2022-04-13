import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/apis/auth/auth.service";
import { TokenService } from "src/apis/token/token.service";
import User from "src/entities/user";
import { IToken } from "src/interfaces/token/IToken";
import AuthRequest from "./auth.request";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request: AuthRequest = ctx.getRequest();

    const token: string = request.headers['authorization'];

    if (token === undefined) {
      throw new BadRequestException('토큰이 존재하지 않습니다.');
    }

    const payload: IToken = this.tokenService.verifyToken(token);
    const user: User | undefined = await this.authService.getUserById(
      payload.id,
    );

    if (user === undefined) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.');
    }

    request.user = user;
    return true;
  }
}