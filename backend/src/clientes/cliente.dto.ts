import { IsString, IsEmail, IsNumber, MaxLength, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  freelancer_id!: number;

  @IsString()
  @MaxLength(255)
  nome!: string;

  @IsEmail()
  email!: string;
}

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
