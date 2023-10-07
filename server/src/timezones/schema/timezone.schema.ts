import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type TimeZoneDocument = HydratedDocument<TimeZone>;

@Schema({ timestamps: true })
export class TimeZone {
  @Prop({ required: [ true, 'El nombre de la zona horaria es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const TimeZoneSchema = SchemaFactory.createForClass(TimeZone);