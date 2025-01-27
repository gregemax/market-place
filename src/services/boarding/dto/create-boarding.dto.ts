import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBoardingDto {
  @IsString()
  OwnerName: string;

  @IsString()
  HorseName: string;

  @IsString()
  description?: string;

  @IsString()
  Breed: string;

  @IsNumber()
  Age: number;

  @IsOptional()
  status: string;

  @IsString()
  phone: string;

  @IsOptional()
  email: string;

  @IsString()
  city: string;
}
