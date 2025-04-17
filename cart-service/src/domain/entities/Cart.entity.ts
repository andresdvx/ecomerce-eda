import { Product } from "../../../../shared";

 
interface Cart {
    id: string;
    userId: string;
    products: Product[];
}

export class CartEntity {

    id: string;
    userId: string;
    products: Product[];
    totalItems: number;

    constructor(
        cart: Cart
    ) {
        const { id, userId, products } = cart;
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.totalItems = products.length;
    }
}