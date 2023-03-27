import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3003;

  app.enableCors({
    origin: true,
  });

  await app.listen(port, () => {
    console.log(`App run on port ${port}`);
  });
}
bootstrap();
