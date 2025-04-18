import { Module } from '@nestjs/common';
import { KafkaModule } from './modules/kafka/kafka.module';
import { LoggerModule } from './modules/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'),
    KafkaModule, 
    LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
