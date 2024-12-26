//export class Veterinary {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type VeterinaryDocument = Veterinary & Document;
export enum status {
  NEW = 'new',
  InProgress = 'InProgress',
  Completed="completed"
}

@Schema({ timestamps: true })
export class Veterinary {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ enum:status,default:status.NEW ,unique:false })
  status: string; 
}

export const VeterinarySchema = SchemaFactory.createForClass(Veterinary);
