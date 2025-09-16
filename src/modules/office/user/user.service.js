import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../../config/data-source.js';
import { env } from '../../../config/env.js';

const repo = () => AppDataSource.getRepository('User');

function sanitizeUser(user) {
    if (!user) return user;
    const { passwordHash, ...rest } = user;
    return rest;
}

export const UserService = {
    async list() {
        return repo().find({ order: { createdAt: 'DESC' } });
    },

    async create({ email, password, firstName, lastName, role = 'user' }) {
        const existing = await repo().findOne({ where: { email } });
        if (existing) {
            const err = new Error('Email already exists');
            err.status = 409;
            throw err;
        }

        const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = repo().create({
            email,
            passwordHash,
            firstName,
            lastName,
            role,
        });

        const saved = await repo().save(user);
        return sanitizeUser(saved);
    },

    async findByEmailWithPassword(email) {
        return repo()
            .createQueryBuilder('u')
            .addSelect('u.passwordHash')
            .where('u.email = :email', { email })
            .getOne();
    },

    async verifyPassword(plain, hash) {
        return bcrypt.compare(plain, hash);
    },

    signToken(user) {
        return jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            env.JWT_SECRET,
            { expiresIn: env.JWT_EXPIRES }
        );
    },

    sanitizeUser,
};