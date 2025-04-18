import { ProductEntity } from "../../../domain/entities/product.entity";
import { ProductRepository } from "../../../domain/repositories/product.repository";

export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return this.repository.getAll();
  }
}