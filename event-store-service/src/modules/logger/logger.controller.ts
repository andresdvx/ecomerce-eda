import { Controller } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessageValue } from 'src/common/kafka/kafka-message.interface';

@Controller()
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @MessagePattern('welcome-flow')
  async welcomeHandler(@Payload() message: KafkaMessageValue) {
    await this.loggerService.saveEventToDb(message);
  }

  @MessagePattern('notifications')
  async notificationsHandler(@Payload() message: KafkaMessageValue) {
    await this.loggerService.saveEventToDb(message);
  }

  @MessagePattern('email-service')
  async emailHandler(@Payload() message: KafkaMessageValue) {
    await this.loggerService.saveEventToDb(message);
  }

  @MessagePattern('invoice-processing')
  async invoiceHandler(@Payload() message: KafkaMessageValue) {
    await this.loggerService.saveEventToDb(message);
  }

  @MessagePattern('cart-removals')
  async cartRemovalsHandler(@Payload() message: KafkaMessageValue) {
    await this.loggerService.saveEventToDb(message);
  }

  @MessagePattern('cart-updates')
  async cartUpdatesHandler(@Payload() message: KafkaMessageValue) {
    await this.loggerService.saveEventToDb(message);
  }
}
