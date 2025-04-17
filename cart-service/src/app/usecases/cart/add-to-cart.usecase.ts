import { CartEntity } from "../../../domain/entities/Cart.entity";
import { EventPublisher } from "../../../domain/events/cart-event-publisher";
import { CartRepository } from "../../../domain/repositories/cart.repository";
import { ProductToCartDto } from "../../../domain/schema/cart.schema";

export class AddToCartUseCase {
  constructor(
    private readonly repository: CartRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(data: ProductToCartDto): Promise<CartEntity> {
    const cart = await this.repository.addToCart(data);
    await this.eventPublisher.publishCartUpdated(data);
    return cart;
  }
}