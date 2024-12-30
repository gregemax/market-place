import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', require: false })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }], default: [] })
  items: Types.ObjectId[];

  //@Prop({ default: 'pending' })
  // status: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  shippingAddress: string;

  @Prop({ default: Date.now })
  placedAt: Date;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true })
  // storeId: string;
  @Prop({
    type: {
      phone: { type: String, required: true },
      email: { type: String },
    },
  })
  contactInfo: {
    phone: string;
    email?: string;
  };

  @Prop({
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
