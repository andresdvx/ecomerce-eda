import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { EmailServiceModule } from './email-service/email-service.module';
import { ConfigModule } from '@nestjs/config';
import { EventHandlerModule } from './event-handler/event-handler.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KafkaModule,
    EmailServiceModule,
    EventHandlerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
