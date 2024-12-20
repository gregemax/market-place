import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderItemDocument = OrderItem & Document;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId; 

  @Prop({ required: true })
  quantity: number; 

  @Prop({ required: true })
  price: number; 
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
