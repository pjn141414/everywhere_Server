import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { TokenModule } from './apis/token/token.module';
import { UploadController } from './apis/upload/upload.controller';
import { UploadService } from './apis/upload/upload.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/ormConfig';
import CatchException from './lib/error/catchException';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, ConfigModule, TokenModule],
  controllers: [AppController, UploadController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: CatchException,
  }, AppService, UploadService],
})
export class AppModule { }
