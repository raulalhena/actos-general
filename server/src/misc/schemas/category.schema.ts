import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Subcategory } from './subcategory.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: [ true, 'El nombre de la categoria es requerido.' ] })
      name: string;

  @Prop()
      subcategories: Subcategory[];

  @Prop()
      description: string;

  
}

export const CategorySchema = SchemaFactory.createForClass(Category);
