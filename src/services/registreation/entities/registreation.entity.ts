
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RegistreationDocument = Registreation & Document;



@Schema({ timestamps: true })
export class Registreation {
  @Prop({ required: true })
  OwnerName: string;
  
  @Prop({ required: true })
  HorseName: string;

  @Prop()
  description?: string;

  @Prop()
  Breed: string;

  @Prop({ required: true })
  Age:number
}

export const RegistreationSchema = SchemaFactory.createForClass(Registreation);
