import { Injectable } from '@nestjs/common';
import { CreateMiscDto } from './dto/create-misc.dto';
import { UpdateMiscDto } from './dto/update-misc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../categories/schema/category.schema';
import { Subcategory } from '../categories/schema/subcategory.schema';
import { Language } from '../languages/schema/language.schema';
import { Time } from '../times/schema/time.schema';
import { Type } from '../types/schemas/type.schema';
import { TimeZone } from '../timezones/schema/timezone.schema';
import { Visibility } from '../visibilities/schema/visibility.schema';
import { Capacity } from '../capacities/schema/capacity.schema';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { CreateSubcategoryDto } from '../categories/dto/create-subcategory.dto';
import { CreateCapacityDto } from '../capacities/dto/create-capacity.dto';
import { CreateLanguageDto } from '../languages/dto/create-language.dto';
import { CreateTypeDto } from '../types/dto/create-type.dto';
import { CreateTimeDto } from '../times/dto/create-time.dto';
import { CreateTimeZoneDto } from '../timezones/dto/create-timezone.dto';
import { CreateVisibilityDto } from '../visibilities/dto/create-visibility.dto';
import { Model, ObjectId } from 'mongoose';
import { Mode } from '../modes/schema/mode.schema';
import { CreateModeDto } from '../modes/dto/create-mode.dto';
import { CreateActiveDto } from '../actives/dto/create-active.dto';
import { Active } from '../actives/schema/active.schema';

@Injectable()
export class MiscService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Language.name) private languageModel: Model<Language>,
    @InjectModel(Time.name) private timeModel: Model<Time>,
    @InjectModel(Type.name) private typeModel: Model<Type>,
    @InjectModel(Active.name) private activeModel: Model<Active>,
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

 createSubcategory(id: ObjectId, createSubcategoryDto: CreateSubcategoryDto) {
  return this.categoryModel.findOneAndUpdate({ _id: id }, { $push: { subcategories: createSubcategoryDto } });
}

 createLanguage( createLanguageDto: CreateLanguageDto) {
   return this.languageModel.create(createLanguageDto);
 }

 createType( createTypeDto: CreateTypeDto) {
   return this.typeModel.create(createTypeDto);
 }

 createActive( createActiveDto: CreateActiveDto) {
  return this.activeModel.create(createActiveDto);
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
   return this.categoryModel.create(createCategoryDto, { ordered: true });
 }

 bulkCreateSubcategory(id: ObjectId, createSubcategoryDto: CreateSubcategoryDto[]) {
   return this.categoryModel.findOneAndUpdate({_id: id}, { $push: { subcategories: createSubcategoryDto } });
 }

 bulkCreateLanguage( createLanguageDto: CreateLanguageDto[]) {
   return this.languageModel.create(createLanguageDto);
 }

 bulkCreateType( createTypeDto: CreateTypeDto[]) {
   return this.typeModel.create(createTypeDto);
 }

 bulkCreateTime( createTimeDto: CreateTimeDto[]) {
   return this.timeModel.create(createTimeDto, { ordered: true });
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
      throw error
    }
     
   }
 
   findAllLanguages() {
     return this.languageModel.find();
   }
 
   findAllTypes() {
     return this.typeModel.find();
   }

   findAllActive() {
    return this.activeModel.find();
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
