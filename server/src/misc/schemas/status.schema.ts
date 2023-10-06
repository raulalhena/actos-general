import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type TypeDocument = HydratedDocument<Status>;

@Schema({ timestamps: true })
export class Status {
  @Prop({ required: [ true, 'El nombre del status de evento es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);