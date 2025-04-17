import { OnWorkerEvent, WorkerHost, Processor } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { RedisQueueConfig } from 'src/common/redis/config/redis-queu.config';
import { NodeMailerService } from '../nodemailer/nodemailer.service';

@Processor(RedisQueueConfig.getQueueConnection().name)
export class QueueHandlerProcessorService extends WorkerHost {
  private logger: Logger = new Logger('QueueHandlerProcessorService');
  
  constructor(private readonly nodeMailerService: NodeMailerService) {
    super();
  }

  async process(job: Job): Promise<void> {
    this.logger.log(`Processing email with id: ${job.id}`);
    const email = job.data;
    await this.nodeMailerService.sendEmail(email);
  }

  @OnWorkerEvent('error')
  onError(error: Error) {
    console.error('Worker error', error);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`email ${job.id} was completed and sent`);
  }
}
