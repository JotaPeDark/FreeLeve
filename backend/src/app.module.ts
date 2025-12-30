import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerModule } from './freelancers/freelancer.module';
import { ClienteModule } from './clientes/cliente.module';
import { ProjetoModule } from './projetos/projeto.module';
import { AtividadeModule } from './atividades/atividade.module';
import { HoraModule } from './horas/hora.module';
import { PagamentoModule } from './pagamentos/pagamento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'freelancer_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
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
