import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bank } from './banks.entity';

@Entity('bank_documents')
export class BankDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Bank, (b) => b.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bank_id' })
  bank: Bank;

  @Column({
    type: 'enum',
    enum: ['application_form', 'approve_letter', 'other'],
  })
  doc_type: 'application_form' | 'approve_letter' | 'other';

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text' })
  file_url: string;

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
}