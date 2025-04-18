import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'users-service',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'users-consumer-group', 
    },
    run: {
      autoCommit: false,
    },
  },
};