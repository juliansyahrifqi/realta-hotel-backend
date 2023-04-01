import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 5000;

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: true,
  });

  await app.listen(port, () => {
    console.log(`App run on port ${port}`);
  });
}
bootstrap();
