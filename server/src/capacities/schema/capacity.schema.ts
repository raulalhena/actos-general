import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type CapacityDocument = HydratedDocument<Capacity>;

@Schema({ timestamps: true })
export class Capacity {
  @Prop({ required: [ true, 'El nombre del tipo de evento es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const CapacitySchema = SchemaFactory.createForClass(Capacity);