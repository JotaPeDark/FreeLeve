import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './pagamento.entity';
import { Projeto } from '../projetos/projeto.entity';
import { CreatePagamentoDto, UpdatePagamentoStatusDto } from './pagamento.dto';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class PagamentoService {
  private mpClient: MercadoPagoConfig;

  constructor(
    @InjectRepository(Pagamento)
    private readonly repository: Repository<Pagamento>,
    @InjectRepository(Projeto)
    private readonly projetoRepo: Repository<Projeto>,
  ) {
    this.mpClient = new MercadoPagoConfig({ 
      accessToken: process.env.MP_ACCESS_TOKEN || '' 
    });
  }

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
    const projeto = await this.projetoRepo.findOne({ 
      where: { id: dto.projeto_id },
      relations: ['cliente']
    });
    
    if (!projeto) {
      throw new BadRequestException(`Projeto ${dto.projeto_id} não encontrado`);
    }

    // Criar pagamento no Mercado Pago
    const payment = new Payment(this.mpClient);
    
    try {
      const mpResponse = await payment.create({
        body: {
          transaction_amount: Number(dto.valor),
          description: `Pagamento Projeto: ${projeto.nome}`,
          payment_method_id: 'pix',
          payer: {
            email: projeto.cliente?.email || 'cliente@email.com',
          },
        }
      });

      const pagamento = this.repository.create({
        projeto_id: dto.projeto_id,
        valor: dto.valor,
        status: 'pendente',
        transaction_id: mpResponse.id?.toString(),
        qr_code: mpResponse.point_of_interaction?.transaction_data?.qr_code,
        qr_code_base64: mpResponse.point_of_interaction?.transaction_data?.qr_code_base64,
      });

      return this.repository.save(pagamento);
    } catch (error: any) {
      console.error('Erro Mercado Pago:', error);
      throw new BadRequestException('Erro ao gerar PIX no Mercado Pago');
    }
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
