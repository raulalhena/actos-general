import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type ActiveDocument = HydratedDocument<Active>;

@Schema({ timestamps: true })
export class Active {
  @Prop({ required: [ true, 'El nombre del Active de evento es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const ActiveSchema = SchemaFactory.createForClass(Active);