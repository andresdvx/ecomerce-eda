import { CartEntity } from "../../../domain/entities/Cart.entity";
import { EventPublisher } from "../../../domain/events/cart-event-publisher";
import { CartRepository } from "../../../domain/repositories/cart.repository";
import { KafkaCartConsumer } from "../../../infrastructure/events/kafka-cart-event-consumer";

export class RemoveFromCartUseCase {

  private readonly EmitEmail = new KafkaCartConsumer()

  constructor(
    private readonly repository: CartRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(userId: string, productId: string): Promise<void> {
    const {productName} = await this.repository.removeFromCart(userId, productId);
    await this.eventPublisher.publishCartRemoved(userId, productId, productName);
    await this.EmitEmail.publishCartRemoved(userId, productId, productName);
  }
}