import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Freelancer } from '../freelancers/freelancer.entity';
import { CreateClienteDto, UpdateClienteDto } from './cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
    @InjectRepository(Freelancer)
    private readonly freelancerRepo: Repository<Freelancer>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.repository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${id} não encontrado`);
    }
    return cliente;
  }

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const freelancer = await this.freelancerRepo.findOne({ where: { id: dto.freelancer_id } });
    if (!freelancer) {
      throw new BadRequestException('Freelancer não encontrado');
    }
    const cliente = this.repository.create(dto);
    return this.repository.save(cliente);
  }

  async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, dto);
    return this.repository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.repository.remove(cliente);
  }
}
