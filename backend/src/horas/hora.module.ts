import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hora } from './hora.entity';
import { HoraService } from './hora.service';
import { HoraController } from './hora.controller';
import { HoraGateway } from './hora.gateway';
import { AtividadeModule } from '../atividades/atividade.module';
import { FreelancerModule } from '../freelancers/freelancer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hora]), AtividadeModule, FreelancerModule],
  controllers: [HoraController],
  providers: [HoraService, HoraGateway],
  exports: [HoraService, TypeOrmModule],
})
export class HoraModule {}
