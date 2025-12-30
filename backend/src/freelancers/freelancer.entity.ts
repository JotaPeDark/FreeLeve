import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, CreateDateColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';

@Entity('freelancers')
@Index(['email'], { unique: true })
export class Freelancer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  chave_pix!: string;

  @OneToMany(() => Cliente, cliente => cliente.freelancer)
  clientes!: Cliente[];

  @CreateDateColumn()
  createdAt!: Date;
}
