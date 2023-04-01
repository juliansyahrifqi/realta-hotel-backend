import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 5001
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true
  });

  await app.listen(port, () => {
    console.log(`App run on port ${port}`);
  });


}
bootstrap();
