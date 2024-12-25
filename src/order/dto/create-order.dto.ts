import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderItemDTO {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @Min(1)
  quantity: number;
  
  @IsNumber()
  @Min(0)
  price: number;
}

export class ContactInfoDTO {
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class CreateOrderDTO {
  // @IsString()
  // @IsNotEmpty()
  // userId: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  orderItems: OrderItemDTO[];

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @ValidateNested()
  @Type(() => ContactInfoDTO)
  contactInfo: ContactInfoDTO;
}
