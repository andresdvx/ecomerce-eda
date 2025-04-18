import { CartEntity } from "../entities/Cart.entity";
import { ProductToCartDto } from "../schema/cart.schema";

export abstract class CartDatasource {
  abstract getCart(userId: string): Promise<CartEntity>;
  abstract addItem(data: ProductToCartDto): Promise<CartEntity>;
  abstract removeItem(userId: string, productId: string): Promise<{ productId: string; userId: string, productName: string }>;
}