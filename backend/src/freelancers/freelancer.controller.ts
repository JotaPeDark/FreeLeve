import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { CreateFreelancerDto, UpdateFreelancerDto } from './freelancer.dto';
import { Freelancer } from './freelancer.entity';

@Controller('freelancers')
export class FreelancerController {
  constructor(private readonly service: FreelancerService) {}

  @Get()
  findAll(): Promise<Freelancer[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Freelancer> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateFreelancerDto): Promise<Freelancer> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFreelancerDto,
  ): Promise<Freelancer> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    await this.service.remove(id);
    return { deleted: true };
  }
}
