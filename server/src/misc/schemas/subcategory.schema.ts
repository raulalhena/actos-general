import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type SubcategoryDocument = HydratedDocument<Subcategory>;

@Schema({ timestamps: true })
export class Subcategory {
  @Prop({ required: [ true, 'El nombre de la subcategoria es requerido.' ], unique: true })
      name: string;

  @Prop()
      description: string;

  @Prop()
      image: string;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);