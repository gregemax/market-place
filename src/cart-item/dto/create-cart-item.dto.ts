import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartItemDto {
  @IsOptional()
  product: Types.ObjectId;

  @IsOptional()
  quantity: number;

  @IsOptional()
  price: number;
}
