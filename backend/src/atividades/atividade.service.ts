import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atividade } from './atividade.entity';
import { Projeto } from '../projetos/projeto.entity';
import { CreateAtividadeDto, UpdateAtividadeDto } from './atividade.dto';

@Injectable()
export class AtividadeService {
  constructor(
    @InjectRepository(Atividade)
    private readonly repository: Repository<Atividade>,
    @InjectRepository(Projeto)
    private readonly projetoRepo: Repository<Projeto>,
  ) {}

  async findAll(): Promise<Atividade[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Atividade> {
    const atividade = await this.repository.findOne({ where: { id } });
    if (!atividade) {
      throw new NotFoundException(`Atividade ${id} não encontrada`);
    }
    return atividade;
  }

  async create(dto: CreateAtividadeDto): Promise<Atividade> {
    const projeto = await this.projetoRepo.findOne({ where: { id: dto.projeto_id } });
    if (!projeto) {
      throw new BadRequestException('Projeto não encontrado');
    }
    const atividade = this.repository.create(dto);
    return this.repository.save(atividade);
  }

  async update(id: number, dto: UpdateAtividadeDto): Promise<Atividade> {
    const atividade = await this.findOne(id);
    Object.assign(atividade, dto);
    return this.repository.save(atividade);
  }

  async remove(id: number): Promise<void> {
    const atividade = await this.findOne(id);
    await this.repository.remove(atividade);
  }
}
