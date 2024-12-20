import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  Guest = 'guest',
  StoreOwner = 'store_owner',
}
@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    enum: UserRole,
    default: UserRole.Guest,
  })
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [Types.ObjectId], ref: 'Store', default: [] })
  storeIds: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cart: Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(User);
