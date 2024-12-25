import { IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  address: string;


  @IsOptional()
  store_picture?: string;


  @IsOptional()
  products: string[];

  @IsString()
  user:string
}
