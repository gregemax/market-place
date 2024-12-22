import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsArray()
  image?: [string];

  @IsNumber()
  numberOfStemStore: number;

  @IsString()
  category;
}
