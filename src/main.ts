import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  // multer
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.use('/public', express.static(join(__dirname, '../public')));

  await app.listen(8000);
}

bootstrap();
