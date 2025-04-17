import { CartRepository } from "../../domain/repositories/cart.repository";
import { CartEntity } from "../../domain/entities/Cart.entity";
import { ProductToCartDto } from "../../domain/schema/cart.schema";
import { CartDatasource } from "../../domain/datasources/cart.datasource";

export class CartRepositoryImpl implements CartRepository {
  constructor(
    private readonly datasource: CartDatasource
  ) {}

  async getCart(userId: string): Promise<CartEntity> {
    return this.datasource.getCart(userId);
  }

  async addToCart(data: ProductToCartDto): Promise<CartEntity> {
    if (data.quantity <= 0) {
      throw new Error("Quantity must be positive");
    }
    return this.datasource.addItem(data);
  }

  async removeFromCart(userId: string, productId: string): Promise<CartEntity> {
    return this.datasource.removeItem(userId, productId);
  }
}