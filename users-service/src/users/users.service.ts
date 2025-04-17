import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';

export interface KafkaMessageValue {
  timestamp: string;
  source: string;
  topic: string;
  originTopic: string;
  payload: Record<string, any>;
  snapshot: Record<string, any>;
}

@Injectable()
export class UsersService {
  constructor(private readonly kafkaService: KafkaService) {}

  private buildKafkaMessage(
    topic: string,
    payload: any,
    snapshot: Record<string, any> = {},
  ): KafkaMessageValue {
    return {
      timestamp: new Date().toLocaleString(),
      source: 'UserService',
      topic,
      originTopic: 'invoice-processing',
      payload,
      snapshot,
    };
  }

  async createUser(userData: any) {
    const message = this.buildKafkaMessage('notifications', {
      user: {
        id: 'user_2940',
        email: 'apacheco.sysnet@gmail.com',
        name: 'judascain setzo',
      },
      invoice: {
        invoiceId: 'invoice_09082',
        total: '50000'
      }
    });

    await this.kafkaService.emit('notifications', message);
    console.log('Event Emitted to: ', message.topic, 'message: ', message);
    return userData;
  }
}
