import { Injectable } from '@nestjs/common';
import { KafkaMessageValue } from 'src/common/kafka/interfaces/kafka-message.interface';
import { KafkaService } from 'src/modules/kafka/kafka.service';

@Injectable()
export class EmailService {
  constructor(private readonly kafkaService: KafkaService) {}

  async handleEvent(data: KafkaMessageValue) {
    
  }
}
