import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, CreateDateColumn, JoinColumn } from 'typeorm';
import { Projeto } from '../projetos/projeto.entity';

@Entity('pagamentos')
@Index(['projeto_id'])
@Index(['status'])
export class Pagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Projeto, projeto => projeto.pagamentos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projeto_id' })
  projeto!: Projeto;

  @Column()
  projeto_id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor!: number;

  @Column({ type: 'varchar', length: 20, default: 'pendente' })
  status!: string;

  @Column({ type: 'text', nullable: true })
  qr_code!: string;

  @Column({ type: 'text', nullable: true })
  qr_code_base64!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transaction_id!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
