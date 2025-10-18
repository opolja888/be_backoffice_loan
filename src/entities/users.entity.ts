import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  phone: string;

  @Column({ type: 'text' })
  password_hash: string;

  @Column({ length: 200 })
  first_name: string;

  @Column({ length: 200 })
  last_name: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
  })
  role: 'user' | 'admin';

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';

  @Column({ type: 'timestamp', nullable: true })
  last_login?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 100 })
  created_by: string;

  @Column({ length: 100 })
  updated_by: string;
}