import { Repository, FindManyOptions, FindOptionsWhere, ObjectLiteral, DeepPartial, QueryRunner, EntityTarget } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class GenericRepository<T extends ObjectLiteral> {
  private readonly className = this.constructor.name;

  constructor(
    private readonly repo: Repository<T>,
    private readonly entity: EntityTarget<T>,
  ) { }

  async find(where: FindOptionsWhere<T> = {}, options?: Partial<FindManyOptions<T>>): Promise<T[]> {
    try {
      return await this.repo.find({
        where,
        ...options,
      });
    } catch (error) {
      throw new Error(`[${this.className}.${this.find.name}] Failed to find: ${error.message}`);
    }
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    try {
      return await this.repo.findOne({ where });
    } catch (error) {
      throw new Error(`[${this.className}.${this.findOne.name}] Failed to findOne: ${error.message}`);
    }
  }

  create(data: DeepPartial<T>): T {
    try {
      return this.repo.create(data);
    } catch (error) {
      throw new Error(`[${this.className}.${this.create.name}] Failed to create: ${error.message}`);
    }
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    try {
      return await this.repo.save(entity);
    } catch (error) {
      throw new Error(`[${this.className}.${this.save.name}] Failed to save: ${error.message}`);
    }
  }

  async update(id: string | number, item: QueryDeepPartialEntity<T>): Promise<void> {
    try {
      await this.repo.update(id, item);
    } catch (error) {
      throw new Error(`[${this.className}.${this.update.name}] Failed to update: ${error.message}`);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      await this.repo.delete(id);
    } catch (error) {
      throw new Error(`[${this.className}.${this.delete.name}] Failed to delete: ${error.message}`);
    }
  }

  async count(where: FindOptionsWhere<T>): Promise<number> {
    try {
      return await this.repo.count({ where });
    } catch (error) {
      throw new Error(`[${this.className}.${this.count.name}] Failed to count: ${error.message}`);
    }
  }

  async createRunner(queryRunner: QueryRunner, item: DeepPartial<T>): Promise<T> {
    try {
      const entity = queryRunner.manager.create(this.entity, item);
      return await queryRunner.manager.save(entity);
    } catch (error) {
      throw new Error(`[${this.className}.${this.createRunner.name}] Failed to create with runner: ${error.message}`);
    }
  }

  async updateRunner(queryRunner: QueryRunner, id: string | number, item: QueryDeepPartialEntity<T>): Promise<void> {
    try {
      await queryRunner.manager.update(this.entity, id, item);
    } catch (error) {
      throw new Error(`[${this.className}.${this.updateRunner.name}] Failed to update with runner: ${error.message}`);
    }
  }

  async deleteRunner(queryRunner: QueryRunner, id: string | number): Promise<void> {
    try {
      await queryRunner.manager.delete(this.entity, id);
    } catch (error) {
      throw new Error(`[${this.className}.${this.deleteRunner.name}] Failed to delete with runner: ${error.message}`);
    }
  }
}