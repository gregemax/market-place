//export class Boarding {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BoardingDocument = Boarding & Document;



@Schema({ timestamps: true })
export class Boarding {
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

export const BoardingSchema = SchemaFactory.createForClass(Boarding);
