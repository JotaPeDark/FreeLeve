import { IsNumber } from 'class-validator';

export class CreateHoraDto {
  @IsNumber()
  atividade_id!: number;

  @IsNumber()
  freelancer_id!: number;
}
