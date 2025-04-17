import { CartEntity } from "../entities/Cart.entity";
import { ProductToCartDto } from "../schema/cart.schema";

export abstract class CartRepository {
  abstract getCart(userId: string): Promise<CartEntity>;
  abstract addToCart(data: ProductToCartDto): Promise<CartEntity>;
  abstract removeFromCart(userId: string, productId: string): Promise<CartEntity>;
}