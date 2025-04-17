import { Product } from '../../../../shared';
export class ProductEntity {

    id: string;
    name: string;
    description: string;
    price: number;
    category: string;


    constructor(
        product: Product
    ) {
        const { id, name, description, price, category } = product;
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}