import { IsNumber, IsString, Min, MaxLength, IsOptional } from 'class-validator';

export class CreatePagamentoDto {
  @IsNumber()
  projeto_id!: number;

  @IsNumber()
  @Min(0)
  valor!: number;
}

export class UpdatePagamentoStatusDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsString()
  transacao_id?: string;

  @IsOptional()
  @IsString()
  qrcode?: string;
}
