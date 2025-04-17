import express, {Router} from 'express';

interface options {
    port: number;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: options) {
        const {port, routes} = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {

        // ** Middlewares ** //
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        // ** Routes ** //
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}: http://localhost:${this.port}`);
        })
    }
}