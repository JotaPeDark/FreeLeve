import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index, CreateDateColumn } from 'typeorm';
import { Projeto } from '../projetos/projeto.entity';
import { Hora } from '../horas/hora.entity';

@Entity('atividades')
@Index(['projeto_id'])
@Index(['status'])
export class Atividade {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Projeto, projeto => projeto.atividades)
  projeto!: Projeto;

  @Column()
  projeto_id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 20, default: 'pendente' })
  status!: string;

  @Column({ type: 'integer', nullable: true })
  tempo_estimado!: number | null;

  @OneToMany(() => Hora, hora => hora.atividade)
  horas!: Hora[];

  @CreateDateColumn()
  createdAt!: Date;
}
