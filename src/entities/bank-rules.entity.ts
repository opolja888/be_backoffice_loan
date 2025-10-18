import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Bank } from './banks.entity';
import { BankRuleCondition } from './bank-rule-conditions.entity';
import { CalcResultDetail } from './calc-result-details.entity';

@Entity('bank_rules')
export class BankRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Bank, (bank) => bank.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bank_id' })
  bank: Bank;

  @Column({
    type: 'enum',
    enum: ['home', 'car', 'personal'],
  })
  loan_type: 'home' | 'car' | 'personal';

  @Column({ type: 'int' })
  version: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  effective_from: Date;

  @Column({ type: 'date' })
  effective_to: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 100 })
  created_by: string;

  @Column({ length: 100 })
  updated_by: string;

  @OneToMany(() => BankRuleCondition, (condition) => condition.rule)
  conditions: BankRuleCondition[];

  @OneToMany(() => CalcResultDetail, (detail) => detail.rule)
  calcResultDetails: CalcResultDetail[];
}