import { CartEntity } from "../../../domain/entities/Cart.entity";
import { EventPublisher } from "../../../domain/events/cart-event-publisher";
import { CartRepository } from "../../../domain/repositories/cart.repository";

export class RemoveFromCartUseCase {
  constructor(
    private readonly repository: CartRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(userId: string, productId: string): Promise<CartEntity> {
    const cart = await this.repository.removeFromCart(userId, productId);
    await this.eventPublisher.publishCartRemoved(userId, productId);
    return cart;
  }
}