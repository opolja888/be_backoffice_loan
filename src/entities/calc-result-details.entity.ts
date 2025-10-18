import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CalcResult } from './calc-results.entity';
import { Bank } from './banks.entity';
import { BankRule } from './bank-rules.entity';

@Entity('calc_result_details')
export class CalcResultDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CalcResult, (cr) => cr.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'result_id' })
  result: CalcResult;

  @ManyToOne(() => Bank, (b) => b.calcResultDetails)
  @JoinColumn({ name: 'bank_id' })
  bank: Bank;

  @ManyToOne(() => BankRule, (br) => br.calcResultDetails)
  @JoinColumn({ name: 'rule_id' })
  rule: BankRule;

  @Column({ type: 'numeric' })
  approved_amount: number;

  @Column({ type: 'numeric' })
  dsr_used: number;

  @Column({ type: 'numeric' })
  net_income: number;

  @Column({ type: 'enum', enum: ['eligible', 'ineligible'] })
  status: 'eligible' | 'ineligible';
}