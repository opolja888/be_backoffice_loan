import fs from 'node:fs';
import path from 'node:path';

export async function loadModuleRoutes(app) {
    const modulesDir = path.resolve('src/modules');
    for (const mod of fs.readdirSync(modulesDir)) {
        const routeFile = path.join(modulesDir, mod, `${mod}.routes.js`);
        if (fs.existsSync(routeFile)) {
            const { default: modRoute } = await import(routeFile);
            app.use(`/api${modRoute.basePath}`, modRoute.router);
        }
    }
}