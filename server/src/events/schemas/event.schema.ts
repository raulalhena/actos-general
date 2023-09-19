import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

Schema();
export class Event {
  name: String;
  description: String;
  tags: [String];
  category: [String];
  venue: String;
  date: Date;
  startTime: String;
  endTime: String;
  timeZone: [String];
  showStartTime: boolean;
  showEndTime: boolean;
  confirmed: boolean;
  type: [String];
  mode: [String];
  image: String;
  video: String;
  qr: String;
  attendees: [String];
  submitted: [String];
  capacity: Number;
  price: Number;
  payment: [String];
  contact: String;
  language: [String];
  web: String;
  visibility: boolean;
  status: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
