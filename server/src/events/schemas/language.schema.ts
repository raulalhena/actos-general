import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Language {
  @Prop({ required: [ true, 'El nombre del idioma es requerido.' ] })
      name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
