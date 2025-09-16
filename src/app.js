import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import { requestLogger } from './middlewares/request-logger.js';
import { errorHandler } from './middlewares/error-handler.js';
import { loadModuleRoutes } from './loaders/routes.loader.js';

export async function createApp() {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    // app.use(requestLogger);

    await loadModuleRoutes(app);
    app.use(errorHandler);
    return app;
}