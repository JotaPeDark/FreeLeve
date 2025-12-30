import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projeto } from './projeto.entity';
import { Cliente } from '../clientes/cliente.entity';
import { CreateProjetoDto, UpdateProjetoDto } from './projeto.dto';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private readonly repository: Repository<Projeto>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Projeto[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.repository.findOne({ where: { id } });
    if (!projeto) {
      throw new NotFoundException(`Projeto ${id} não encontrado`);
    }
    return projeto;
  }

  async create(dto: CreateProjetoDto): Promise<Projeto> {
    const cliente = await this.clienteRepo.findOne({ where: { id: dto.cliente_id } });
    if (!cliente) {
      throw new BadRequestException('Cliente não encontrado');
    }
    const projeto = this.repository.create(dto);
    return this.repository.save(projeto);
  }

  async update(id: number, dto: UpdateProjetoDto): Promise<Projeto> {
    const projeto = await this.findOne(id);
    Object.assign(projeto, dto);
    return this.repository.save(projeto);
  }

  async remove(id: number): Promise<void> {
    const projeto = await this.findOne(id);
    await this.repository.remove(projeto);
  }
}
