import { Request, Response } from 'express';
import { validateProductToCart } from "../../domain/schema/cart.schema";
import { CartRepository } from '../../domain/repositories/cart.repository';
import { AddToCartUseCase } from '../../app/usecases/cart/add-to-cart.usecase';
import { EventPublisher } from '../../domain/events/cart-event-publisher';
import { RemoveFromCartUseCase } from '../../app/usecases/cart/remove-from-cart';
import { GetCartUseCase } from '../../app/usecases/cart/get-cart.usecase';

export class CartController {
    constructor(
        private readonly repository: CartRepository,
        private readonly eventPublisher: EventPublisher
    ) { 
        console.log('Repository:', repository);  // Verify the repository
        console.log('Event Publisher:', eventPublisher);  
    }

    async addToCart({ body }: Request, res: Response) {
        try {
            const {data, error, success} = validateProductToCart(body);
            if(!success) throw new Error(JSON.stringify(error));
            const cart = await new AddToCartUseCase(this.repository, this.eventPublisher).execute(data);
            res.status(200).json(cart);
        } catch (error) {
            console.log({'Error: ': error});
            res.status(500).json({ error: error });
        }
    }

    async removeFromCart({body, params}: Request, res: Response) {
        try {
            const { productId } = params;
            const { userId } = body;
            const cart = await new RemoveFromCartUseCase(this.repository, this.eventPublisher).execute(userId, productId);
            res.status(200).json(cart);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async getCart(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const cart = await new GetCartUseCase(this.repository).execute(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}