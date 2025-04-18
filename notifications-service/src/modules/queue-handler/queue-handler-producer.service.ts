import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { EmailPayload } from 'src/common/email/interfaces/email-payload.interface';
import { RedisQueueConfig } from 'src/common/redis/config/redis-queu.config';

@Injectable()
export class QueueHandlerProducerService {
  private logger: Logger = new Logger('QueueHandlerProducerService');
  
  constructor(
    @InjectQueue(RedisQueueConfig.getQueueConnection().name)
    private readonly emailqueue: Queue,
  ) {}

  async addEmailToQueue(email: EmailPayload) {
    await this.emailqueue.add('SEND-EMAIL-EVENT', email);
    this.logger.log(`Email added to queue: ${email.to}`);
  }
}
