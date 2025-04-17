import { Injectable, Logger } from '@nestjs/common';
import { EmailPayload } from 'src/common/email/interfaces/email-payload.interface';
import { BuildKafkaMessageInterface } from 'src/common/event-handler/interfaces/build-kafka-message.interface';
import { KafkaMessageValue } from 'src/common/kafka/interfaces/kafka-message.interface';
import { KafkaService } from 'src/modules/kafka/kafka.service';

@Injectable()
export class EventHandlerService {
  private logger: Logger = new Logger(EventHandlerService.name);

  constructor(private readonly kafkaService: KafkaService) {}

  public async handleEvent(data: KafkaMessageValue) {
    const { originTopic } = data;

    if (!originTopic) {
      this.logger.warn('❌ Evento sin topic de origen');
      return;
    }

    await this.emitEmailEvent(data);
  }

  private async emitEmailEvent(data: KafkaMessageValue) {
    const { email } = data.payload.user;

    const emailContent = this.getEmailContent(data);

    if (!emailContent) {
      this.logger.warn(
        '⚠️ No se pudo construir el contenido del email. Evento omitido.',
      );
      return;
    }

    const message: KafkaMessageValue = this.buildKafkaMessage({
      targetTopic: 'email-service',
      originTopic: 'notifications',
      payload: { email: emailContent },
    });

    this.logger.log(`📤 Sending email to ${email}`);

    try {
      await this.kafkaService.emit('email-service', message);
    } catch (error) {
      this.logger.error('❌ Error enviando mensaje a email-service', error);
    }
  }

  private getEmailContent(data: KafkaMessageValue): EmailPayload | null {
    const { originTopic } = data;

    switch (originTopic) {
      case 'welcome-flow':
        return this.getWelcomeEmailContent(data);
      case 'invoice-processing':
        return this.getInvoiceProcessingEmailContent(data);
      case 'cart-removals':
        return this.getCartRemovalsEmailContent(data);
      default:
        this.logger.warn(`❌ Evento no manejado: ${data.originTopic}`);
        return null;
    }
  }

  private getWelcomeEmailContent(data: KafkaMessageValue): EmailPayload {
    const { email, name } = data.payload.user;

    return {
      to: email,
      subject: `¡Bienvenido a nuestra plataforma!,`,
      content: `Hola ${name}, gracias por registrarte en nuestro e-commerce.`,
    };
  }

  private getInvoiceProcessingEmailContent(
    data: KafkaMessageValue,
  ): EmailPayload {
    const { email } = data.payload.user;
    const { invoiceId, total } = data.payload.invoice;

    return {
      to: email,
      subject: `Factura ${invoiceId}`,
      content: `Total ${total}`,
    };
  }

  private getCartRemovalsEmailContent(data: KafkaMessageValue): EmailPayload {
    const { email, name } = data.payload.user;
    const { name: productName } = data.payload.product;

    return {
      to: email,
      subject: `¿Olvidaste algo en tu carrito?`,
      content: `Hola ${name}, vimos que eliminaste '${productName}' de tu carrito...`,
    };
  }

  private buildKafkaMessage(
    data: BuildKafkaMessageInterface,
  ): KafkaMessageValue {
    return {
      timestamp: new Date().toLocaleString(),
      source: 'notifications-service',
      topic: data.targetTopic,
      originTopic: data.originTopic,
      payload: data.payload,
      snapshot: data.snapShot || {},
    };
  }
}
