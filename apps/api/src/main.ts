import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 6000;
  await app.listen(PORT);
  console.log(`started server on [::]:${PORT}, url: http://localhost:${PORT}`)
}
bootstrap();
