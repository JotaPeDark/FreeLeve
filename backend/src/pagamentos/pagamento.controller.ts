import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto, UpdatePagamentoStatusDto } from './pagamento.dto';
import { Pagamento } from './pagamento.entity';

@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly service: PagamentoService) {}

  @Get()
  findAll(): Promise<Pagamento[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pagamento> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePagamentoDto): Promise<Pagamento> {
    return this.service.create(dto);
  }

  @Post(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePagamentoStatusDto,
  ): Promise<Pagamento> {
    return this.service.updateStatus(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    await this.service.remove(id);
    return { deleted: true };
  }
}
