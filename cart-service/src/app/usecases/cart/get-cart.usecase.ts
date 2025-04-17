import { CartEntity } from "../../../domain/entities/Cart.entity";
import { CartRepository } from "../../../domain/repositories/cart.repository";

export class GetCartUseCase {
  constructor(private readonly repository: CartRepository) {}

  async execute(userId: string): Promise<CartEntity> {
    return this.repository.getCart(userId);
  }
}