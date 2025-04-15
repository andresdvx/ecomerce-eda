import { Controller } from '@nestjs/common';
import { EventHandlerService } from './event-handler.service';

@Controller('event-handler')
export class EventHandlerController {
  constructor(private readonly eventHandlerService: EventHandlerService) {}
}
