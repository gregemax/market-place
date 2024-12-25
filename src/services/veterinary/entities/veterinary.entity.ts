//export class Veterinary {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type VeterinaryDocument = Veterinary & Document;

@Schema({ timestamps: true })
export class Veterinary {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: 'new' })
  status: string; 
}

export const VeterinarySchema = SchemaFactory.createForClass(Veterinary);
