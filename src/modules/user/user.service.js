// import bcrypt from 'bcrypt';
import { AppDataSource } from '../../config/data-source.js';

export const UserService = {
    // async create({ email, name, password }) {
    //     const repo = AppDataSource.getRepository('User');
    //     const existed = await repo.findOne({ where: { email } });
    //     if (existed) throw Object.assign(new Error('Email already in use'), { status: 409 });

    //     const passwordHash = await bcrypt.hash(password, 10);
    //     const user = repo.create({ email, name, passwordHash });
    //     return repo.save(user);
    // },

    async list() {
        const repo = AppDataSource.getRepository('User');
        return repo.find({ order: { createdAt: 'DESC' } });
    }
};