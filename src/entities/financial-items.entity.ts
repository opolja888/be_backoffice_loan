import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { FinancialPeriod } from './financial-periods.entity';

@Entity('financial_items')
export class FinancialItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FinancialPeriod, (fp) => fp.financialItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'period_id' })
  period: FinancialPeriod;

  @Column({ type: 'enum', enum: ['income', 'expense'] })
  item_type: 'income' | 'expense';

  @Column({ length: 100 })
  category: string;

  @Column({ type: 'numeric' })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}