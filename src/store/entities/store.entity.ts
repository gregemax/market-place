import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type storeDocument = store & Document;

@Schema({ timestamps: true })
export class store {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  store_picture?: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] }) 
  products: Types.ObjectId[]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user', required: false })
  user: MongooseSchema.Types.ObjectId;
}

export const storeSchema = SchemaFactory.createForClass(store);
