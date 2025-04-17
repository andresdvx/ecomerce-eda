import { CartEntity } from "../entities/Cart.entity";
import { ProductToCartDto } from "../schema/cart.schema";

export abstract class CartDatasource {
    abstract get(): Promise<CartEntity[]>;
    abstract addProduct (data: ProductToCartDto): Promise<void>;
    abstract removeProduct (productId: string, userId: string): Promise<void>;
}

// add : (userId, productId, quantity ) : cartId, totalItems, updatedAt
// delete : (userId, productId) : userId, productId, quantity