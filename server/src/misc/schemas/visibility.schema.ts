import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type VisibilityDocument = HydratedDocument<Visibility>;

@Schema({ timestamps: true })
export class Visibility {
  @Prop({ required: [ true, 'El nombre de la visibilidad es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const VisibilitySchema = SchemaFactory.createForClass(Visibility);