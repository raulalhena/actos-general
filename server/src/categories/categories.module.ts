import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/categories/schema/category.schema';
import { Category } from './schema/category.schema';
import { Subcategory, SubcategorySchema } from './schema/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema},
        {
          name: Subcategory.name,
          schema: SubcategorySchema
        }
      ])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
