import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/misc/schemas/category.schema';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
