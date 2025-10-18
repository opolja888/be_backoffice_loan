import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customers.entity';

@Entity('debt')
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (c) => c.debts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ length: 100 })
  creditor_name: string;

  @Column({ length: 100 })
  liability_type: string;

  @Column({ length: 50 })
  account_number: string;

  @Column({ type: 'numeric' })
  original_amount: number;

  @Column({ type: 'numeric' })
  outstanding_amount: number;

  @Column({ type: 'numeric' })
  installment_amount: number;

  @Column({
    type: 'enum',
    enum: ['active', 'closed'],
    default: 'active',
  })
  status: 'active' | 'closed';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}