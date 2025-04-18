import { Controller } from '@nestjs/common';
import { EventHandlerService } from './event-handler.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventHandlerController {
  constructor(private readonly eventHandlerService: EventHandlerService) {}

  @EventPattern('welcome-flow')
  async eventHandler(@Payload() message: any) {
    await this.eventHandlerService.handleEvent(message);
  }
}
