import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_NAME: z.string()
});

export const env = EnvSchema.parse(process.env);