import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  service_offered: string;
  
  @IsString()
  experience: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  role: string;

  // @IsString()
  // @MinLength(4)
  // password: string;

  @IsString()
  phone: string;

  @IsOptional()
  profile: string;
}
