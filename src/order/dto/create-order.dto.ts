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
  product: string; // Product ID or reference

  @IsNumber()
  @Min(1)
  quantity: number; // Number of items ordered

  @IsNumber()
  @Min(0)
  price: number; // Price per unit
}

export class ContactInfoDTO {
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  userId: string; // ID of the user placing the order

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  orderItems: OrderItemDTO[]; // Array of order items

  @IsString()
  @IsNotEmpty()
  shippingAddress: string; // Shipping address for the order

  @ValidateNested()
  @Type(() => ContactInfoDTO)
  contactInfo: ContactInfoDTO; // Contact details for the user
}
