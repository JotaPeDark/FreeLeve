import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Hora } from './hora.entity';
import { Atividade } from '../atividades/atividade.entity';
import { Freelancer } from '../freelancers/freelancer.entity';
import { CreateHoraDto } from './hora.dto';

@Injectable()
export class HoraService {
  constructor(
    @InjectRepository(Hora)
    private readonly repository: Repository<Hora>,
    @InjectRepository(Atividade)
    private readonly atividadeRepo: Repository<Atividade>,
    @InjectRepository(Freelancer)
    private readonly freelancerRepo: Repository<Freelancer>,
  ) {}

  async findAll(): Promise<Hora[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Hora> {
    const hora = await this.repository.findOne({ where: { id } });
    if (!hora) {
      throw new NotFoundException(`Hora ${id} não encontrada`);
    }
    return hora;
  }

  async findAtivas(): Promise<Hora[]> {
    return this.repository.find({
      where: { fim: IsNull() },
      relations: ['atividade', 'freelancer'],
    });
  }

  async create(dto: CreateHoraDto): Promise<Hora> {
    const atividade = await this.atividadeRepo.findOne({ where: { id: dto.atividade_id } });
    if (!atividade) {
      throw new BadRequestException('Atividade não encontrada');
    }

    const freelancer = await this.freelancerRepo.findOne({ where: { id: dto.freelancer_id } });
    if (!freelancer) {
      throw new BadRequestException('Freelancer não encontrado');
    }

    const horaAtiva = await this.repository.findOne({
      where: {
        atividade_id: dto.atividade_id,
        freelancer_id: dto.freelancer_id,
        fim: IsNull(),
      },
    });

    if (horaAtiva) {
      throw new BadRequestException('Já existe registro de hora ativo para este freelancer nesta atividade');
    }

    const hora = this.repository.create({
      ...dto,
      inicio: new Date(),
      fim: null,
      tempo_total: 0,
    });

    return this.repository.save(hora);
  }

  async parar(id: number): Promise<Hora> {
    const hora = await this.findOne(id);

    if (hora.fim) {
      throw new BadRequestException('Este registro já foi finalizado');
    }

    hora.fim = new Date();
    hora.tempo_total = Math.floor((hora.fim.getTime() - hora.inicio.getTime()) / 1000);

    return this.repository.save(hora);
  }

  async remove(id: number): Promise<void> {
    const hora = await this.findOne(id);
    await this.repository.remove(hora);
  }
}
