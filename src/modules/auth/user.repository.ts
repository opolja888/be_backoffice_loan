import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  private readonly userRepo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo, User);
    this.userRepo = repo;
  }

  async findOneWithCredentials(where: Partial<User>): Promise<User | null> {
    try {
      return await this.userRepo
        .createQueryBuilder('user')
        .select(['user.id', 'user.password', 'user.firstName', 'user.lastName', 'user.role'])
        .where(where)
        .getOne();
    } catch (error) {
      throw new Error(`[${this.constructor.name}.${this.findOneWithCredentials.name}] Failed to find user: ${error.message}`);
    }
  }
}