import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Customer } from './customers.entity';
import { CalcResultDetail } from './calc-result-details.entity';

@Entity('calc_results')
export class CalcResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (c) => c.calcResults, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'jsonb' })
  debts_id: any;

  @Column({ type: 'enum', enum: ['baseline', 'simulate'] })
  type: 'baseline' | 'simulate';

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CalcResultDetail, (crd) => crd.result)
  details: CalcResultDetail[];
}