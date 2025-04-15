
export class RedisQueueConfig {
  static getQueueConnection() {
    return {
      name: 'MESSAGE-QUEUE',
      connection: {
        url: process.env.REDIS_URL,
      },
    };
  }
}