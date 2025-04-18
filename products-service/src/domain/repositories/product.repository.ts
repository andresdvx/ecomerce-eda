import { ProductEntity } from "../entities/product.entity";
import { ProductDto } from '../schema/product.schema';

export interface ProductRepository {
  getAll(): Promise<ProductEntity[]>;
  create(data: ProductDto): Promise<ProductEntity>;
} 