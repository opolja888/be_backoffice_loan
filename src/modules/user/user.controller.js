import { z } from 'zod';
import { UserService } from './user.service.js';

const CreateUserDto = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100),
    password: z.string().min(8)
});

export const UserController = {
    create: async (req, res, next) => {
        try {
            const dto = CreateUserDto.parse(req.body);
            const user = await UserService.create(dto);
            res.status(201).json({ data: user });
        } catch (err) {
            next(err);
        }
    },

    list: async (_req, res, next) => {
        try {
            const users = await UserService.list();
            res.json({ data: users });
        } catch (err) {
            next(err);
        }
    }
};