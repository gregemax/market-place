import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = User & Document;
export enum UserRole {
  Guest = 'guest',
  StoreOwner = 'store_owner',
  Admin="admin"
}
@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
  @Prop({
    enum: UserRole,
    default: UserRole.StoreOwner,
    unique: false,
  })
  role: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  profile: string;

  @Prop({ type: Types.ObjectId, ref: 'store',})
  storeIds: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cart: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
