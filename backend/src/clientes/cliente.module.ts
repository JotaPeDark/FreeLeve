import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { FreelancerModule } from '../freelancers/freelancer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), FreelancerModule],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService, TypeOrmModule],
})
export class ClienteModule {}
