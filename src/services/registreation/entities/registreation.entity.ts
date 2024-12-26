
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RegistreationDocument = Registreation & Document;


export enum status {
  NEW = 'new',
  InProgress = 'InProgress',
  Completed="completed"
}
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

  @Prop({ enum:status,default:status.NEW ,unique:false })
  status: string; 
}

export const RegistreationSchema = SchemaFactory.createForClass(Registreation);
