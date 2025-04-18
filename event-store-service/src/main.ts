import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfig } from './common/kafka/kafka.config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    kafkaConfig,
  );
  await app.listen();
  console.log('🚀 Event Store Service is running...');
}
bootstrap();
