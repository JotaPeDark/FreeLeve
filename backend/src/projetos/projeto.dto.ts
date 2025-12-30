import { IsString, IsNumber, MaxLength, Min, IsOptional } from 'class-validator';

export class CreateProjetoDto {
  @IsNumber()
  cliente_id!: number;

  @IsString()
  @MaxLength(255)
  nome!: string;

  @IsNumber()
  @Min(0)
  valor!: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;
}

export class UpdateProjetoDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  valor?: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;
}
