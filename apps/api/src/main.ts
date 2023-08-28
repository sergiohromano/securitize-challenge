import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  const PORT = process.env.PORT || 5002;
  await app.listen(PORT);
  console.log(`started server on [::]:${PORT}, url: http://localhost:${PORT}`)
}
bootstrap();
