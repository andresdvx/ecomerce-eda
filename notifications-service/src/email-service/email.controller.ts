import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller('email-service')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('welcome-flow')
  async handleWelcomeFlowTopic(data: any) {
    await this.emailService.handleWelcomeFlowEmail();
  }

  @EventPattern('invoice-processing')
  async handleInvoiceProcessingTopic(data: any) {
    await this.emailService.handleInvoiceProcessingEmail();
  }

  @EventPattern('cart-removals')
  async handleCartRemovalsTopic(data: any) {
    await this.emailService.handleInvoiceProcessingEmail();
  }
}
