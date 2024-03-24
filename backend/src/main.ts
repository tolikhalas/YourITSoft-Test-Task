import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TodoLogger } from './shared/logger/logger.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(TodoLogger));
  await app.listen(3000);
}
bootstrap();
