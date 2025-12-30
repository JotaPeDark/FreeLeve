import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atividade } from './atividade.entity';
import { AtividadeService } from './atividade.service';
import { AtividadeController } from './atividade.controller';
import { ProjetoModule } from '../projetos/projeto.module';

@Module({
  imports: [TypeOrmModule.forFeature([Atividade]), ProjetoModule],
  controllers: [AtividadeController],
  providers: [AtividadeService],
  exports: [AtividadeService, TypeOrmModule],
})
export class AtividadeModule {}
