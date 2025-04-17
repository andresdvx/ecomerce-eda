import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    await main()
})()


async function main() {
    const server = new Server({port: 7000, routes: AppRoutes.routes});
    await server.start()
}