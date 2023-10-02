import { Injectable } from '@nestjs/common';
import { CreateMiscDto } from './dto/create-misc.dto';
import { UpdateMiscDto } from './dto/update-misc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Subcategory } from './schemas/subcategory.schema';
import { Language } from './schemas/language.schema';
import { Time } from './schemas/time.schema';
import { Type } from './schemas/type.schema';
import { TimeZone } from './schemas/timezone.schema';
import { Visibility } from './schemas/visibility.schema';
import { Capacity } from './schemas/capacity.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateTimeDto } from './dto/create-time.dto';
import { CreateTimeZoneDto } from './dto/create-timezone.dto';
import { CreateVisibilityDto } from './dto/create-visibility.dto';
import { Model, ObjectId } from 'mongoose';
import { Mode } from './schemas/mode.schema';
import { CreateModeDto } from './dto/create-mode.dto';

@Injectable()
export class MiscService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Language.name) private languageModel: Model<Language>,
    @InjectModel(Time.name) private timeModel: Model<Time>,
    @InjectModel(Type.name) private typeModel: Model<Type>,
    @InjectModel(TimeZone.name) private timeZoneModel: Model<TimeZone>,
    @InjectModel(Visibility.name) private visibilityModel: Model<Visibility>,
    @InjectModel(Capacity.name) private capacityModel: Model<Capacity>,
    @InjectModel(Mode.name) private modeModel: Model<Mode>,
  ) {}

 /****
   * Create
   */

 createCategory(createCategoryDto: CreateCategoryDto) {
   return this.categoryModel.create(createCategoryDto);
 }

 createSubcategory(createSubcategoryDto: CreateSubcategoryDto) {
   return this.subcategoryModel.create(createSubcategoryDto);
 }

 createLanguage( createLanguageDto: CreateLanguageDto) {
   return this.languageModel.create(createLanguageDto);
 }

 createType( createTypeDto: CreateTypeDto) {
   return this.typeModel.create(createTypeDto);
 }

 createTime( createTimeDto: CreateTimeDto) {
   return this.timeModel.create(createTimeDto);
 }

 createTimeZone( createTimeZoneDto: CreateTimeZoneDto) {
   return this.timeZoneModel.create(createTimeZoneDto);
 }

 createCapacity( createCapacityDto: CreateCapacityDto) {
   return this.capacityModel.create(createCapacityDto);
 }

 createVisibility( createVisibilityDto: CreateVisibilityDto) {
   return this.visibilityModel.create(createVisibilityDto);
 }

 createMode( createModeDto: CreateModeDto) {
  return this.modeModel.create(createModeDto);
}

 /*
 * End Create
 ****/

 /****
   * Bulk Creating
   */

 bulkCreateCategory( createCategoryDto: CreateCategoryDto[]) {
   return this.categoryModel.create(createCategoryDto);
 }

 bulkCreateSubcategory( createSubcategoryDto: CreateSubcategoryDto[]) {
   return this.subcategoryModel.create(createSubcategoryDto);
 }

 bulkCreateLanguage( createLanguageDto: CreateLanguageDto[]) {
   return this.languageModel.create(createLanguageDto);
 }

 bulkCreateType( createTypeDto: CreateTypeDto[]) {
   return this.typeModel.create(createTypeDto);
 }

 bulkCreateTime( createTimeDto: CreateTimeDto[]) {
   return this.timeModel.create(createTimeDto);
 }

 bulkCreateTimeZone( createTimeZoneDto: CreateTimeZoneDto[]) {
   return this.timeZoneModel.create(createTimeZoneDto);
 }

 bulkCreateCapacity( createCapacityDto: CreateCapacityDto[]) {
   return this.capacityModel.create(createCapacityDto);
 }

 bulkCreateVisibility(createVisibilityDto: CreateVisibilityDto[]) {
   return this.visibilityModel.create(createVisibilityDto);
 }

 /*
 * End Bulk Creating
 ****/

   /****
   * Find All
   */

   findAllCategories() {
     return this.categoryModel.find();
   }
 
   findAllSubcategories(id: ObjectId) {
    try {
      return this.categoryModel.findById({ _id: id }).select('-_id subcategories');
    } catch (error) {
      console.log(error);
    }
     
   }
 
   findAllLanguages() {
     return this.languageModel.find();
   }
 
   findAllTypes() {
     return this.typeModel.find();
   }

   findAllTimes() {
     return this.timeModel.find();
   }
 
   findAllTimeZones() {
     return this.timeZoneModel.find();
   }
 
   findAllCapacities() {
     return this.capacityModel.find();
   }
 
   findAllVisibilities() {
     return this.visibilityModel.find();
   }

   findAllModes() {
    return this.modeModel.find();
  }
 
   /*
   * End Find All
   ****/

  findOne(id: number) {
    return `This action returns a #${id} misc asdfasdfsa`;
  }

  update(id: number, updateMiscDto: UpdateMiscDto) {
    return `This action updates a #${id} misc`;
  }

  remove(id: number) {
    return `This action removes a #${id} misc`;
  }
}
