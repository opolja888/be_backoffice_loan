import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env.js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [path.resolve(__dirname, '../**/*.model.{js,ts}')],
  migrations: [path.resolve(__dirname, '../database/migrations/*.{js,ts}')],
});