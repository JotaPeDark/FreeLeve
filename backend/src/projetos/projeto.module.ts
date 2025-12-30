import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './projeto.entity';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { ClienteModule } from '../clientes/cliente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto]), ClienteModule],
  controllers: [ProjetoController],
  providers: [ProjetoService],
  exports: [ProjetoService, TypeOrmModule],
})
export class ProjetoModule {}
