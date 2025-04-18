import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductDto } from "../../domain/schema/product.schema";

export class ProductRepositoryImpl implements ProductRepository {

    constructor(private readonly productDatasource: ProductRepository) { }

    async getAll(): Promise<ProductEntity[]> {
       return await this.productDatasource.getAll();
    }
    async create(data: ProductDto): Promise<ProductEntity> {
        return await this.productDatasource.create(data);
    }
}