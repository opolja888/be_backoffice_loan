import { createApp } from './app.js';
import { AppDataSource } from './config/data-source.js';
import { env } from './config/env.js';

async function bootstrap() {
    await AppDataSource.initialize();
    const app = await createApp();
    app.listen(env.PORT, () => {
        console.log(`Server running on http://localhost:${env.PORT}`);
    });
}

bootstrap().catch((e) => {
    console.error('Startup failed:', e);
    process.exit(1);
});