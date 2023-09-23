import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: [ true, 'El nombre del evento es requerido.' ] })
      name: string;

  @Prop({ required: [ true, 'La descripción del evento es requerida.' ] })
      description: string;

  @Prop()
      tags: string[];

  @Prop()
      category: string;

  @Prop()
      address: string;

  @Prop({ type: Date, required: [ true, 'La fecha del evento es requerida.' ] })
      date: Date;

  @Prop()
      startTime: string;

  @Prop()
      endTime: string;

  @Prop()
      timeZone: string;

  @Prop()
      showDate: boolean;

  @Prop()
      showTime: boolean;

  @Prop()
      type: string;

  @Prop()
      mode: string;

  @Prop()
      image: string;

  @Prop()
      video: string;

  @Prop({ default: '' })
      qrEvent: string;

  @Prop({ default: [] })
      qrAttendees: string[];

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: User.name } ], default: [] })
      attendees: mongoose.Types.ObjectId[];

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: User.name } ], default: [] })
      submitted: mongoose.Types.ObjectId[];

  @Prop()
      capacity: number;

  @Prop()
      price: number;

  @Prop()
      payment: string;

  @Prop()
      organizedBy: string[];

  @Prop()
      contactEmail: string;

  @Prop()
      language: string[];

  @Prop()
      web: string;

  @Prop({ default: false })
      visibility: boolean;

  @Prop({ default: false })
      active: boolean;

  @Prop()
      customForm: string;

  @Prop({ type: Object })
      form: Object;

   @Prop()
        subcategory: string;

    @Prop({ default: false })
      isPrivate: boolean;

    @Prop({ default: false })
    isLimited: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
