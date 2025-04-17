import { Router } from "express";
import { KafkaEventPublisher } from "../../infrastructure/events/kafka-cart-event-publisher.impl";
import { CartRepositoryImpl } from "../../infrastructure/repositories/cart.repository.impl";
import { CartDatasourceImpl } from "../../infrastructure/datasources/cart.datasource.impl";
import { CartController } from "./controller";

export class CartRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new CartDatasourceImpl();
        const repository = new CartRepositoryImpl(datasource);
        const eventPlublisher = new KafkaEventPublisher();
        const controller = new CartController(repository, eventPlublisher);


        router.post('/items', controller.addToCart.bind(controller));
        router.delete('/items/:productId', controller.removeFromCart.bind(controller));
        router.get('/:userId', controller.getCart.bind(controller));


        return router
    }
}