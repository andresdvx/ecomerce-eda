import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLogModel, EventLogSchema } from './models/event-log.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventLogModel.name, schema: EventLogSchema },
    ]),
  ],
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule {}
