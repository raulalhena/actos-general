import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ObjectId } from 'mongoose';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Subcategory } from './schema/subcategory.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  // @Get('subcategories')
  // async findAllSubcategories() {
  //   return this.categoriesService.findAllSubcategories();
  // }
  @Get('/:id')
  findById(@Param ('id')_id: ObjectId) {
    return this.categoriesService.findCategoryById(_id)
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Put(':id/subcategories')
  createSubcategory(@Param('id') id: ObjectId, @Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.categoriesService.createSubcategory(id, createSubcategoryDto);
  }

  @Post('categories/load')
  bulkCreateCategory(@Body() createCategoryDto: CreateCategoryDto[]) {
    return this.categoriesService.bulkCreateCategory(createCategoryDto);
  }

  @Post('/:id/subcategories/load')
  bulkCreateSubcategory(@Param('id') id: ObjectId, @Body() createSubcategoryDto: CreateSubcategoryDto[]) {
    return this.categoriesService.bulkCreateSubcategory(id, createSubcategoryDto);
  }

  @Get()
  findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

 

  @Delete(':id/:subcategoryname')
  removeSubcategory(@Param('id') id: string , @Param('subcategoryname') subcategoryName: string) {
    return this.categoriesService.deleteSubcategory(id, subcategoryName);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }

 
}
