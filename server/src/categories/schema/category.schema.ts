import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Subcategory } from './subcategory.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: [ true, 'El nombre de la categoria es requerido.' ], unique: true })
      name: string;

  @Prop()
      subcategories: Subcategory[];

  @Prop()
      description: string;

    @Prop()
        _id: string;

  
}

export const CategorySchema = SchemaFactory.createForClass(Category);
