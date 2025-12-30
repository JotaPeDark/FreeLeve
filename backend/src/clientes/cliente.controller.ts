import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto, UpdateClienteDto } from './cliente.dto';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly service: ClienteService) {}

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateClienteDto): Promise<Cliente> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClienteDto,
  ): Promise<Cliente> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    await this.service.remove(id);
    return { deleted: true };
  }
}
