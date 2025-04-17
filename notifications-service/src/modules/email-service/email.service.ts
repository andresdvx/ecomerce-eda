import { Injectable } from '@nestjs/common';
import { KafkaMessageValue } from 'src/common/kafka/interfaces/kafka-message.interface';
import { EmailPayload } from 'src/common/email/interfaces/email-payload.interface';
import { QueueHandlerProducerService } from '../queue-handler/queue-handler-producer.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly queueHandlerProducerService: QueueHandlerProducerService,
  ) {}

  async handleEvent(data: KafkaMessageValue) {
    const  email: EmailPayload  = data.payload.email;
    await this.queueHandlerProducerService.addEmailToQueue(email);
  }
}
