import { CartDatasource } from '../../domain/datasources/cart.datasource';
import { CartEntity } from '../../domain/entities/Cart.entity';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { ProductToCartDto } from '../../domain/schema/cart.schema';
export class CartRepositoryImpl implements CartRepository{

    constructor(
        private readonly datasource : CartDatasource
    ){}

    get(): Promise<CartEntity[]> {
        return this.datasource.get();
    }
    addProduct(data: ProductToCartDto): Promise<void> {
        return this.datasource.addProduct(data);
    }
    removeProduct(productId: string, userId: string): Promise<void> {
        return this.datasource.removeProduct(productId, userId);
    }

}