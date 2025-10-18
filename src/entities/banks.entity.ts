import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BankDocument } from './bank-documents.entity';
import { CalcResultDetail } from './calc-result-details.entity';

@Entity('banks')
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name_th: string;

  @Column({ length: 200 })
  name_en: string;

  @Column({ length: 20, unique: true })
  code: string;

  @Column({ type: 'text' })
  logo_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => BankDocument, (bd) => bd.bank)
  documents: BankDocument[];

  @OneToMany(() => CalcResultDetail, (crd) => crd.bank)
  calcResultDetails: CalcResultDetail[];
}