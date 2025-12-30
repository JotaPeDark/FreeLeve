import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto, UpdateProjetoDto } from './projeto.dto';
import { Projeto } from './projeto.entity';

@Controller('projetos')
export class ProjetoController {
  constructor(private readonly service: ProjetoService) {}

  @Get()
  findAll(): Promise<Projeto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Projeto> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProjetoDto): Promise<Projeto> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjetoDto,
  ): Promise<Projeto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    await this.service.remove(id);
    return { deleted: true };
  }
}
