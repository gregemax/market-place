import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;
export enum ProductCategory {
  HORSES = 'horses',
  VETENARY = 'vetenary',
  TRAINING = 'training',
  STUD = 'stud',
  LUXURYBOARDING='luxuryBoarding'
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  image?: [string];

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  numberOfStemStore: number;

  @Prop({ type: Types.ObjectId, ref: 'store', required: true })
  storeId: string;

  @Prop({
    type: String,
    enum: ProductCategory,
    required: true,
    unique:false
  })
  category: ProductCategory;

  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
