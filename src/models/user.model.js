import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generationStrategy: 'uuid',
            default: () => 'gen_random_uuid()'
        },
        email: { type: 'varchar', length: 120, unique: true },
        name: { type: 'varchar', length: 100 },
        passwordHash: { type: 'varchar', length: 255 },
        createdAt: { type: 'timestamp', createDate: true, default: () => 'now()' },
        updatedAt: { type: 'timestamp', updateDate: true, default: () => 'now()' }
    }
});