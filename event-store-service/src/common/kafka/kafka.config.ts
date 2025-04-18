import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'event-storage-service',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'event-storage-consumer-group',
      allowAutoTopicCreation: true,
    },
    run: {
      autoCommit: false,
    },
  },
};
