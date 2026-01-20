import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerModule } from './freelancers/freelancer.module';
import { ClienteModule } from './clientes/cliente.module';
import { ProjetoModule } from './projetos/projeto.module';
import { AtividadeModule } from './atividades/atividade.module';
import { HoraModule } from './horas/hora.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
}),
    FreelancerModule,
    ClienteModule,
    ProjetoModule,
    AtividadeModule,
    HoraModule,
    PagamentoModule,
  ],
})
export class AppModule {}
