import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { FinancialPeriod } from './financial-periods.entity';
import { Debt } from './debt.entity';
import { CalcResult } from './calc-results.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 13, unique: true })
  national_id: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 100 })
  occupation: string;

  @Column({ length: 20 })
  phone_number: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 100 })
  created_by: string;

  @Column({ length: 100 })
  updated_by: string;

  @OneToMany(() => FinancialPeriod, (fp) => fp.customer)
  financialPeriods: FinancialPeriod[];

  @OneToMany(() => Debt, (d) => d.customer)
  debts: Debt[];

  @OneToMany(() => CalcResult, (cr) => cr.customer)
  calcResults: CalcResult[];
}