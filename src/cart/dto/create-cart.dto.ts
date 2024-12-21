import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
  @IsOptional()
  items: Types.ObjectId[];

  @IsOptional()
  totalAmount: number;

  @IsOptional()
  totalQuantity: number;
}

export class addtocart {
  @IsString()
  productId: string;
  @IsNumber()
  quantity: number;
}
