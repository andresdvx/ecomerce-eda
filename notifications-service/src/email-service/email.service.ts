import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class EmailService {
  constructor(private readonly kafkaService: KafkaService) {}

  async handleWelcomeFlowEmail() {}

  async handleInvoiceProcessingEmail() {}

  async handleCartRemovalsEmail() {}
}
