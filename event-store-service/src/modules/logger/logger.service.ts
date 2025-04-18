import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { KafkaMessageValue } from 'src/common/kafka/kafka-message.interface';
import { EventLogModel } from './models/event-log.model';

@Injectable()
export class LoggerService {
  private logger: Logger = new Logger(Logger.name);

  constructor(
    @InjectModel(EventLogModel.name)
    private readonly logModel: Model<EventLogModel>,
  ) {}

  async saveEventToDb(event: KafkaMessageValue) {
    try {
      const eventId = v4();
      await this.logModel.create({eventId, ...event});
      this.logger.log(`Event [${event.originTopic}] saved to DB `);
    } catch (error) {
      console.error('Error saving event to DB:', error);
      throw error;
    }
  }
}
