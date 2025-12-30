import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { HoraService } from './hora.service';
import { CreateHoraDto } from './hora.dto';
import { Hora } from './hora.entity';

@Controller('horas')
export class HoraController {
  constructor(private readonly service: HoraService) {}

  @Get()
  findAll(): Promise<Hora[]> {
    return this.service.findAll();
  }

  @Get('ativas')
  findAtivas(): Promise<Hora[]> {
    return this.service.findAtivas();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Hora> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateHoraDto): Promise<Hora> {
    return this.service.create(dto);
  }

  @Post(':id/parar')
  parar(@Param('id', ParseIntPipe) id: number): Promise<Hora> {
    return this.service.parar(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    await this.service.remove(id);
    return { deleted: true };
  }
}
