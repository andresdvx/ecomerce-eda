import { Request, Response } from 'express';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEventPublisher } from '../../domain/events/product-event.publisher';
import { GetProductsUseCase } from '../../app/usecases/product/get-products.usecase';
import { CreateProductUseCase } from '../../app/usecases/product/create-product.usecase';

export class ProductController {

    constructor(private readonly repository: ProductRepository, private readonly eventPublisher: ProductEventPublisher) { }

    async getAll(req: Request, res: Response) {
        try {
            const products = await new GetProductsUseCase(this.repository).execute();
            res.status(200).json(products);
        } catch (error) {`  `
            res.status(500).json({ error: error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const product = await new CreateProductUseCase(this.repository, this.eventPublisher).execute(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}