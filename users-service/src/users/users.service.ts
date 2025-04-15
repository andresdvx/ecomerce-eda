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
      timestamp: new Date().toISOString(),
      source: 'notifications-service',
      topic,
      originTopic: 'welcome-flow',
      payload,
      snapshot,
    };
  }

  async createUser(userData: any) {
    const message = this.buildKafkaMessage('notifications', {
      name: 'juancho',
      email: 'juancho@mail.com',
    });

    await this.kafkaService.emit('notifications', message);
    return userData;
  }
}
