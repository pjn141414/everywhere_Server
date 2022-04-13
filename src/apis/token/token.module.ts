import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})

export class TokenModule { }
