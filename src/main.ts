import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  )
  app.enableCors({
    origin: true
  });


  const PORT = process.env.PORT || 5001

  await app.listen(PORT, () => {
    console.log(`Server listen di port ${PORT}`)
  });


}
bootstrap();
