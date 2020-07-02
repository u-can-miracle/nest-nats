import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NatsStrategy } from './nats.server';

async function bootstrap() {
  const logger = new Logger('Main:bootstrap');
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new NatsStrategy({
      url: 'nats://localhost:4222',
    }),
  });
  app.listen(() => logger.verbose('Microservice is listening...'));
}

bootstrap();
