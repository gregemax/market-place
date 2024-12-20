import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CartItem' }], default: [] })
  items: Types.ObjectId[]; 

  @Prop({ default: 0 })
  totalAmount: number; 

  @Prop({ default: 0 })
  totalQuantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
