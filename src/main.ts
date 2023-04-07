import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT || 5000;

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: true,
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'));

  await app.listen(port, () => {
    console.log(`App run on port ${port}`);
  });
}
bootstrap();
