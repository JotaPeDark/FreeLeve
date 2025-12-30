import { IsString, IsNumber, MaxLength, Min, IsOptional } from 'class-validator';

export class CreateAtividadeDto {
  @IsNumber()
  projeto_id!: number;

  @IsString()
  @MaxLength(255)
  nome!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tempo_estimado?: number;
}

export class UpdateAtividadeDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tempo_estimado?: number;
}
