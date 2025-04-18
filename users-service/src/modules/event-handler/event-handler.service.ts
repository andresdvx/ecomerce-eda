import { Injectable, Logger } from '@nestjs/common';
import { KafkaMessageValue } from 'src/common/kafka/kafka-message.interface';
import { KafkaService } from '../kafka/kafka.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class EventHandlerService {
  private logger: Logger = new Logger('UsersEventHandler');

  constructor(private readonly kafkaServie: KafkaService) {}

  public async handleEvent(data: KafkaMessageValue) {
    this.logger.log('Event received from:', data.originTopic);
    const { name, email }: UserEntity = data.payload.user;

    const message = this.kafkaServie.buildKafkaMessage(
      'notifications',
      {
        user: {
          name,
          email,
        },
      },
      'welcome-flow',
    );

    await this.kafkaServie.emit('notifications', message);
    this.logger.log('Event Emitted to:', message.topic);
  }
}
