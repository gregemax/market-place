import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Reference to the User

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store: Types.ObjectId; // Reference to the Store from which the order was placed

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }], default: [] })
  items: Types.ObjectId[]; // Array of OrderItems

  @Prop({ default: 'pending' })
  status: string; // Order status: 'pending', 'completed', etc.

  @Prop({ required: true })
  totalAmount: number; // Total amount for the order

  @Prop({ required: true })
  shippingAddress: string; // Shipping address for the order

  @Prop({ default: Date.now })
  placedAt: Date; // Date when the order was placed
}

export const OrderSchema = SchemaFactory.createForClass(Order);
