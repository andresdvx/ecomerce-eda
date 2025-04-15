import { Module } from '@nestjs/common';
import { EventHandlerService } from './event-handler.service';
import { EventHandlerController } from './event-handler.controller';

@Module({
  controllers: [EventHandlerController],
  providers: [EventHandlerService],
})
export class EventHandlerModule {}
