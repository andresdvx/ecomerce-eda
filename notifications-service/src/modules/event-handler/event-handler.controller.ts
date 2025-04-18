import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventHandlerService } from './event-handler.service';

@Controller('event-handler')
export class EventHandlerController {
  constructor(private readonly eventHandlerService: EventHandlerService) {}

  @EventPattern('notifications')
  async handleNotificationsEvent(@Payload() data: any) {
    await this.eventHandlerService.handleEvent(data);
  }
}
