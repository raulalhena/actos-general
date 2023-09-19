import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type EventDocument = HydratedDocument<Event>;

Schema({timestamps: true});
export class Event {
  @Prop({ required: [true, 'El nombre del evento es requerido.'] })
  name: string;

  @Prop({ required: [true, 'La descripción del evento es requerida.'] })
  description: string;

  @Prop()
  tags: string;

  @Prop()
  category: string;

  @Prop()
  address: string;

  @Prop({ type: Date, required: [true, 'La fecha del evento es requerida.'] })
  date: Date;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  timeZone: string;

  @Prop()
  showStartTime: boolean;

  @Prop()
  showEndTime: boolean;

  @Prop()
  confirmed: boolean;

  @Prop()
  type: string;

  @Prop()
  mode: string;

  @Prop()
  image: string;

  @Prop()
  video: string;

  @Prop()
  qr: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  attendees: ObjectId[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  submitted: ObjectId[];

  @Prop()
  capacity: number;

  @Prop()
  price: number;

  @Prop()
  payment: string;

  @Prop()
  contact: string;

  @Prop()
  language: string[];

  @Prop()
  web: string;

  @Prop()
  visibility: boolean;

  @Prop()
  status: boolean;

  @Prop()
  customForm: string;

  @Prop()
  form: Object;
}

export const EventSchema = SchemaFactory.createForClass(Event);
