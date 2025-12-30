import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './pagamento.entity';
import { Projeto } from '../projetos/projeto.entity';
import { CreatePagamentoDto, UpdatePagamentoStatusDto } from './pagamento.dto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly repository: Repository<Pagamento>,
    @InjectRepository(Projeto)
    private readonly projetoRepo: Repository<Projeto>,
  ) {}

  async findAll(): Promise<Pagamento[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Pagamento> {
    const pagamento = await this.repository.findOne({ where: { id } });
    if (!pagamento) {
      throw new NotFoundException(`Pagamento ${id} não encontrado`);
    }
    return pagamento;
  }

  async create(dto: CreatePagamentoDto): Promise<Pagamento> {
    // Verificar se o projeto existe
    const projeto = await this.projetoRepo.findOne({ 
      where: { id: dto.projeto_id }
    });
    
    if (!projeto) {
      throw new BadRequestException(`Projeto ${dto.projeto_id} não encontrado`);
    }

    const pagamento = this.repository.create({
      projeto_id: dto.projeto_id,
      valor: dto.valor,
      status: 'pendente',
    });

    return this.repository.save(pagamento);
  }

  async updateStatus(id: number, dto: UpdatePagamentoStatusDto): Promise<Pagamento> {
    const pagamento = await this.findOne(id);
    Object.assign(pagamento, dto);
    return this.repository.save(pagamento);
  }

  async remove(id: number): Promise<void> {
    const pagamento = await this.findOne(id);
    await this.repository.remove(pagamento);
  }
}
