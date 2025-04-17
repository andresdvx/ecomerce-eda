import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueHandlerProducerService } from './queue-handler-producer.service';
import { RedisQueueConfig } from 'src/common/redis/config/redis-queu.config';
import { EmailModule } from '../email-service/email.module';
import { NodeMailerModule } from '../nodemailer/nodemailer.module';
import { QueueHandlerProcessorService } from './queue-handler-processor.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: RedisQueueConfig.getQueueConnection().name,
    }),
    forwardRef(()=> EmailModule),
    NodeMailerModule
  ],
  controllers: [],
  providers: [QueueHandlerProducerService, QueueHandlerProcessorService],
  exports: [
    BullModule,
    QueueHandlerProducerService,
  ],
})
export class QueueHandlerModule {}
