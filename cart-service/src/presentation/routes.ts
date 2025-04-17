import {Router} from "express";
import { CartRoutes } from "./cart/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/cart', CartRoutes.routes);

        return router
    }
}