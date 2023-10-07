import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type TimeDocument = HydratedDocument<Time>;

@Schema({ timestamps: true })
export class Time {
  @Prop({ required: [ true, 'El nombre de la hora es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const TimeSchema = SchemaFactory.createForClass(Time);