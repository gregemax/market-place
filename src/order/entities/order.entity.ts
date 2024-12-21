import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; 

  // @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  // store: Types.ObjectId; 

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }], default: [] })
  items: Types.ObjectId[]; 

  @Prop({ default: 'pending' })
  status: string; 

  @Prop({ required: true })
  totalAmount: number; 

  @Prop({ required: true })
  shippingAddress: string; 

  @Prop({ default: Date.now })
  placedAt: Date; 
}

export const OrderSchema = SchemaFactory.createForClass(Order);
