import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: [ true, 'El nombre de la categoria es requerido.' ] })
      name: string;

  @Prop()
      description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
