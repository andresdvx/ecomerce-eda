import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfig } from './common/kafka/kafka.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(kafkaConfig);

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  await app.startAllMicroservices();
  
  await app.listen(5000);

  console.log('🚀 User-service escuchando HTTP en puerto 5000 + Kafka activado');
}
bootstrap();
