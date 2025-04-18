import { Router } from "express";
import { ProductDatasourceImpl } from "../../infrastructure/datasources/product.datasource.impl";
import { ProductRepositoryImpl } from "../../infrastructure/repositories/product.repository.impl";
import { KafkaProductPublisher } from "../../infrastructure/kafka/kafka-product.publisher";
import { ProductController } from "./controller";

export class ProductRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ProductDatasourceImpl();
        const repository = new ProductRepositoryImpl(datasource);
        const eventPlublisher = new KafkaProductPublisher();
        const controller = new ProductController(repository, eventPlublisher);

        router.post('/api/products', controller.create.bind(controller));
        router.get('/api/products', controller.getAll.bind(controller));

        return router;
    }
}