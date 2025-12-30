import { IsString, IsEmail, MaxLength, IsOptional } from 'class-validator';

export class CreateFreelancerDto {
  @IsString()
  @MaxLength(255)
  nome!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(255)
  chave_pix!: string;
}

export class UpdateFreelancerDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  chave_pix?: string;
}
