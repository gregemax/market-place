import { IsEmail, isEmail, IsOptional, IsString } from 'class-validator';

export class CreateTrainingDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;
  @IsString()
  AdditionalInformation?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  ServiceType: string;

  @IsOptional()
  status: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;
}
