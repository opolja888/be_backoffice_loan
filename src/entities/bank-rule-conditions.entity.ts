import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BankRule } from './bank-rules.entity';

@Entity('bank_rule_conditions')
export class BankRuleCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BankRule, (br) => br.conditions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rule_id' })
  rule: BankRule;

  @Column({ type: 'numeric', nullable: true })
  min_income?: number;

  @Column({ type: 'numeric', nullable: true })
  max_income?: number;

  @Column({ type: 'numeric' })
  dsr_percent: number;

  @Column({ type: 'numeric', nullable: true })
  max_multiplier?: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}