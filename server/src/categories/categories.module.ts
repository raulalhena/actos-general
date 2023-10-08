import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { Category, CategorySchema } from "./schema/category.schema";
import { Subcategory, SubcategorySchema } from "./schema/subcategory.schema";

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
