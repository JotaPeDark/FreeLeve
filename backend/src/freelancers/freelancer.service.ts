import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Freelancer } from './freelancer.entity';
import { CreateFreelancerDto, UpdateFreelancerDto } from './freelancer.dto';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private readonly repository: Repository<Freelancer>,
  ) {}

  async findAll(): Promise<Freelancer[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Freelancer> {
    const freelancer = await this.repository.findOne({ where: { id } });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer ${id} não encontrado`);
    }
    return freelancer;
  }

  async create(dto: CreateFreelancerDto): Promise<Freelancer> {
    const freelancer = this.repository.create(dto);
    return this.repository.save(freelancer);
  }

  async update(id: number, dto: UpdateFreelancerDto): Promise<Freelancer> {
    const freelancer = await this.findOne(id);
    Object.assign(freelancer, dto);
    return this.repository.save(freelancer);
  }

  async remove(id: number): Promise<void> {
    const freelancer = await this.findOne(id);
    await this.repository.remove(freelancer);
  }
}
