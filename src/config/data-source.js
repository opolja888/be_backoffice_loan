import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env.js';
import { UserSchema } from '../modules/user/user.schema.js';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    synchronize: false,
    logging: env.NODE_ENV !== 'production',
    entities: [UserSchema],
    migrations: ['src/database/migrations/*.js']
});