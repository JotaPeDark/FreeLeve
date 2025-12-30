import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { CreateAtividadeDto, UpdateAtividadeDto } from './atividade.dto';
import { Atividade } from './atividade.entity';

@Controller('atividades')
export class AtividadeController {
  constructor(private readonly service: AtividadeService) {}

  @Get()
  findAll(): Promise<Atividade[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Atividade> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAtividadeDto): Promise<Atividade> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAtividadeDto,
  ): Promise<Atividade> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    await this.service.remove(id);
    return { deleted: true };
  }
}
