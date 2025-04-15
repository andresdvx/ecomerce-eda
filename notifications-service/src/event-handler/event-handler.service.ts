import { Injectable, Logger } from '@nestjs/common';
import { EmailPayload } from 'src/common/email/interfaces/email-payload.interface';
import { KafkaMessageValue } from 'src/common/kafka/interfaces/kafka-message.interface';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class EventHandlerService {
  private logger: Logger = new Logger(EventHandlerService.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async handleEvent(data: KafkaMessageValue) {
    const { originTopic } = data;

    switch (originTopic) {
      case 'welcome-flow':
        await this.handleWelcomeFlowEmail(data);
        break;
      case 'invoice-processing':
        await this.handleInvoiceProcessingEmail(data);
        break;
      case 'cart-removals':
        await this.handleCartRemovalsEmail(data);
        break;
      default:
        this.logger.warn(`❌ Evento no manejado: ${originTopic}`);
        break;
    }
  }

  async handleWelcomeFlowEmail(data: KafkaMessageValue) {
    const { email, name } = data.payload;

    if (!email || !name) {
      this.logger.warn('❌ Evento welcome-flow inválido, falta email o nombre');
      return;
    }

    const emailContent: EmailPayload = {
      to: email,
      subject: `¡Bienvenido a nuestra plataforma!,`,
      content: `Hola ${name}, gracias por registrarte en nuestro e-commerce.`,
    };

    const message: KafkaMessageValue = this.buildKafkaMessage(
      'email-service',
      'notifications',
      emailContent,
      {},
    );

    this.logger.log(`📤 Enviando email de bienvenida a ${email}`);

    try {
      await this.kafkaService.emit('email-service', message);
    } catch (error) {
      this.logger.error('❌ Error enviando mensaje a email-service', error);
    }
  }

  async handleInvoiceProcessingEmail(data: KafkaMessageValue) {
    const { email } = data.payload;
  }

  async handleCartRemovalsEmail(data: KafkaMessageValue) {
    const { email } = data.payload;
  }

  private buildKafkaMessage(
    targetTopic: string,
    originTopic: string,
    payload: any,
    snapshot: Record<string, any> = {},
  ): KafkaMessageValue {
    return {
      timestamp: new Date().toISOString(),
      source: 'notifications-service',
      topic: targetTopic,
      originTopic: originTopic,
      payload,
      snapshot,
    };
  }
}
