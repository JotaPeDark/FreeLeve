import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, CreateDateColumn } from 'typeorm';
import { Atividade } from '../atividades/atividade.entity';
import { Freelancer } from '../freelancers/freelancer.entity';

@Entity('horas')
@Index(['atividade_id'])
@Index(['freelancer_id'])
@Index(['inicio'])
export class Hora {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Atividade, atividade => atividade.horas, { onDelete: 'CASCADE' })
  atividade!: Atividade;

  @Column()
  atividade_id!: number;

  @ManyToOne(() => Freelancer, { onDelete: 'CASCADE' })
  freelancer!: Freelancer;

  @Column()
  freelancer_id!: number;

  @Column({ type: 'timestamp' })
  inicio!: Date;

  @Column({ type: 'timestamp', nullable: true })
  fim!: Date | null;

  @Column({ type: 'integer', default: 0 })
  tempo_total!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
