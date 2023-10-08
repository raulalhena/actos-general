import { Injectable, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CreateSubcategoryDto } from "./dto/create-subcategory.dto";
import { Category } from "./schema/category.schema";
import { Subcategory } from "./schema/subcategory.schema";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private  categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>
    ) {}

  // Create categories
  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }
 
  createSubcategory(id: ObjectId, createSubcategoryDto: CreateSubcategoryDto) {
   return this.categoryModel.findOneAndUpdate({ _id: id }, { $push: { subcategories: createSubcategoryDto } });
 }
// find categories

findAllCategories() {
  return this.categoryModel.find();
}

findAllSubcategories(id: ObjectId) {
  try {
    return this.categoryModel.findById({ _id: id }).select('-_id subcategories');
  } catch (error) {
    throw error
  }
   
 }

async findCategoryById(id: ObjectId) {
  try {
    const category = await this.categoryModel.findById({ _id: id });
    return category;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}


bulkCreateCategory( createCategoryDto: CreateCategoryDto[]) {
  return this.categoryModel.create(createCategoryDto, { ordered: true });
}

bulkCreateSubcategory(id: ObjectId, createSubcategoryDto: CreateSubcategoryDto[]) {
  return this.categoryModel.findOneAndUpdate({_id: id}, { $push: { subcategories: createSubcategoryDto } });
}


// async findAllSubcategories(): Promise<Subcategory[]> {
//   const categories = await this.categoryModel.find();
//   const allSubcategories: Subcategory[] = [];
//   categories.forEach((category) => {
//     allSubcategories.push(...category.subcategories);
//   });
//   return allSubcategories;
// }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async deleteSubcategory(categoryId: ObjectId, subcategoryName: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById({_id :categoryId})
    
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    
      const subcategoryIndex = category.subcategories.findIndex(
        (subcategory) => subcategory.name === subcategoryName
      );
    
      if (subcategoryIndex === -1) {
        throw new NotFoundException('Subcategory not found in the category');
      }
    
      category.subcategories.splice(subcategoryIndex, 1);
    
      const updatedCategory = await category.save();
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }
  
}
