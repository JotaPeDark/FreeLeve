import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index, CreateDateColumn, JoinColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Atividade } from '../atividades/atividade.entity';

@Entity('projetos')
@Index(['cliente_id'])
@Index(['status'])
export class Projeto {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cliente, cliente => cliente.projetos)
  @JoinColumn({ name: 'cliente_id' })
  cliente!: Cliente;

  @Column()
  cliente_id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor!: number;

  @Column({ type: 'varchar', length: 20, default: 'pendente' })
  status!: string;

  @OneToMany(() => Atividade, atividade => atividade.projeto)
  atividades!: Atividade[];

  @CreateDateColumn()
  createdAt!: Date;
}
