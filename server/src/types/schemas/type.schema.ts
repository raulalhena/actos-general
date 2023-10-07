import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type TypeDocument = HydratedDocument<Type>;

@Schema({ timestamps: true })
export class Type {
  @Prop({ required: [ true, 'El nombre del tipo de evento es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);