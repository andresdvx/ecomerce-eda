import { ProductToCartDto } from "../schema/cart.schema";

export interface EventPublisher {
  publishCartUpdated(data: ProductToCartDto): Promise<void>;
  publishCartRemoved(userId: string, productId: string, productName: string): Promise<void>;
}