import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.entity';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { ProjetoModule } from '../projetos/projeto.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento]), ProjetoModule],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService, TypeOrmModule],
})
export class PagamentoModule {}
