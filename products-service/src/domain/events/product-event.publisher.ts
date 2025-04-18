import { ProductEntity } from "../entities/product.entity";

export interface ProductEventPublisher {
  publishProductCreated(product: ProductEntity): Promise<void>;
}