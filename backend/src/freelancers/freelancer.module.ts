import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from './freelancer.entity';
import { FreelancerService } from './freelancer.service';
import { FreelancerController } from './freelancer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Freelancer])],
  controllers: [FreelancerController],
  providers: [FreelancerService],
  exports: [FreelancerService, TypeOrmModule],
})
export class FreelancerModule {}
