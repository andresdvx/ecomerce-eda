import { ProductRoutes } from "./presentation/product/routes";
import { Server } from "./presentation/server";

(async () => {
    await main()
})()


async function main() {
    const server = new Server({port: 9000, routes: ProductRoutes.routes});
    await server.start()
}