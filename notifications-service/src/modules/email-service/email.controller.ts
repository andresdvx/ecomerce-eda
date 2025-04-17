import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller('email-service')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('email-service')
  async handleEmailService(@Payload() data: any) {
    await this.emailService.handleEvent(data);
  }
}
