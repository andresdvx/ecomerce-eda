import { prisma } from '../../../../shared';
import { ProductDatasource } from '../../domain/datasources/product.datasource';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductDto } from '../../domain/schema/product.schema';


export class ProductDatasourceImpl implements ProductDatasource {
  async getAll(): Promise<ProductEntity[]> {
    const products = await prisma.product.findMany();
    return products.map(ProductEntity.fromPrismaModel);
  }

  async create(product: ProductDto): Promise<ProductEntity> {
    const created = await prisma.product.create({ data: product });
    return ProductEntity.fromPrismaModel(created);
  }
}