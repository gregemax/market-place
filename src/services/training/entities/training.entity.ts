//export class Veterinary {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type trainingDocument = training & Document;

export enum Us {
  TrainingProgram = 'Training Program',
  BreedingServices = 'Breeding Services',
}
export enum status {
  NEW = 'new',
  InProgress = 'InProgress',
  Completed = 'completed',
}

@Schema({ timestamps: true })
export class training {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
  @Prop()
  AdditionalInformation?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ enum: Us, unique: false })
  ServiceType: string;

  @Prop({ enum: status, default: status.NEW, unique: false })
  status: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  city: string;
}

export const trainingSchema = SchemaFactory.createForClass(training);
