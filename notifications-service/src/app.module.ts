import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './modules/kafka/kafka.module';
import { EmailModule } from './modules/email-service/email.module';
import { EventHandlerModule } from './modules/event-handler/event-handler.module';
import { RedisQueueConfig } from './common/redis/config/redis-queu.config';
import { QueueHandlerModule } from './modules/queue-handler/queue-handler.module';
import { NodeMailerModule } from './modules/nodemailer/nodemailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: RedisQueueConfig.getQueueConnection().connection,
    }),
    KafkaModule,
    EventHandlerModule,
    EmailModule,
    QueueHandlerModule,
    NodeMailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
