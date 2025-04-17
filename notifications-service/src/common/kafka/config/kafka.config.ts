import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'notificacions-service',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'notificacions-consumer-group', 
    },
    run: {
      autoCommit: true,
    },
  },
};