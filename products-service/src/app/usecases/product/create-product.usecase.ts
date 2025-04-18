import { ProductDatasource } from "../../../domain/datasources/product.datasource";
import { ProductEntity } from "../../../domain/entities/product.entity";
import { ProductEventPublisher } from "../../../domain/events/product-event.publisher";
import { ProductRepository } from "../../../domain/repositories/product.repository";
import { ProductDto } from "../../../domain/schema/product.schema";

export class CreateProductUseCase {
  constructor(
    private readonly repository: ProductRepository,
    private readonly eventPublisher: ProductEventPublisher
  ) {}

  async execute(product: ProductDto): Promise<ProductEntity> {
    const created = await this.repository.create(product);
    await this.eventPublisher.publishProductCreated(created);
    return created;
  }
}