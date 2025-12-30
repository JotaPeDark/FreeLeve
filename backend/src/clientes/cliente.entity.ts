import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index, CreateDateColumn, JoinColumn } from 'typeorm';
import { Freelancer } from '../freelancers/freelancer.entity';
import { Projeto } from '../projetos/projeto.entity';

@Entity('clientes')
@Index(['freelancer_id'])
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Freelancer, freelancer => freelancer.clientes)
  @JoinColumn({ name: 'freelancer_id' })
  freelancer!: Freelancer;

  @Column()
  freelancer_id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @OneToMany(() => Projeto, projeto => projeto.cliente)
  projetos!: Projeto[];

  @CreateDateColumn()
  createdAt!: Date;
}
