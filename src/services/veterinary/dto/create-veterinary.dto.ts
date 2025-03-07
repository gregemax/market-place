import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateVeterinaryDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  status: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;
}
