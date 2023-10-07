import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User, UserSchema } from '../../users/schemas/user.schema';

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

  @Prop({ required: [ true, 'La fecha del evento es requerida.' ] })
      date: string;

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
      image: Blob;

  @Prop()
      video: string;

  @Prop({ default: '' })
      qrEvent: string;

  @Prop({ default: [] })
      qrAttendees: string[];

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: User.name } ], default: [] })
      attendees: mongoose.Types.ObjectId[];
    //{ type: [{ user:  }]}
  @Prop({ type: [ { userId: { type: mongoose.Schema.Types.ObjectId, ref: User.name }, qrUser: { type: String } } ] })
      submitted: { 
        userId: mongoose.Schema.Types.ObjectId,
        qrUser: String;
        }[];

  @Prop({ type: [ { userId: { type: mongoose.Schema.Types.ObjectId, ref: User.name }} ], default: [] })
      submittedOnline: User;

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
    
    @Prop()
        webLink: string;

    @Prop()
        confirmed: boolean;

    @Prop()
        subcategoryLogo: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
