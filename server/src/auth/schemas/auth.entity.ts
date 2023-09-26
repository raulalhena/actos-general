import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type AuthDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: [ true, 'El nombre del usuario es requerido.' ] })
      name: string;

  @Prop({ required: [ true, 'El apellido del usuario es requerido' ] })
      surname: string;

  @Prop({ required: [ true, 'El email del usuario es requerido.' ] })
      email: string;

  @Prop({ required: [ true, 'La contraseña del usuario es requerida.' ] })
      password: string;
  
  @Prop({ required: [ true, 'El rol del usuario es requerido.' ] })
      role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

