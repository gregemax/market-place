import { IsEmail, isEmail, IsString } from 'class-validator';

export class CreateTrainingDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;
  @IsString()
  AdditionalInformation?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  ServiceType: string;

  @IsString()
  status: string;
}
