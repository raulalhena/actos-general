import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MiscService } from './misc.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateTimeDto } from './dto/create-time.dto';
import { CreateTimeZoneDto } from './dto/create-timezone.dto';
import { CreateVisibilityDto } from './dto/create-visibility.dto';

@Controller('misc')
export class MiscController {
  constructor(private readonly miscService: MiscService) {}

  /****
   * Create
   */

  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.miscService.createCategory(createCategoryDto);
  }

  @Post('subcategories')
  createSubcategory(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.miscService.createSubcategory(createSubcategoryDto);
  }

  @Post('languages')
  createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
    return this.miscService.createLanguage(createLanguageDto);
  }

  @Post('types')
  createType(@Body() createTypeDto: CreateTypeDto) {
    return this.miscService.createType(createTypeDto);
  }

  @Post('times')
  createTime(@Body() createTimeDto: CreateTimeDto) {
    return this.miscService.createTime(createTimeDto);
  }

  @Post('timezones')
  createTimeZone(@Body() createTimeZoneDto: CreateTimeZoneDto) {
    return this.miscService.createTimeZone(createTimeZoneDto);
  }

  @Post('capacities')
  createCapacity(@Body() createCapacityDto: CreateCapacityDto) {
    return this.miscService.createCapacity(createCapacityDto);
  }

  @Post('visibilities')
  createVisibility(@Body() createVisibilityDto: CreateVisibilityDto) {
    return this.miscService.createVisibility(createVisibilityDto);
  }

  /*
  * End Create
  ****/

  /****
   * Bulk Creating
   */

  @Post('categories/load')
  bulkCreateCategory(@Body() createCategoryDto: CreateCategoryDto[]) {
    return this.miscService.bulkCreateCategory(createCategoryDto);
  }

  @Post('subcategories/load')
  bulkCreateSubcategory(@Body() createSubcategoryDto: CreateSubcategoryDto[]) {
    return this.miscService.bulkCreateSubcategory(createSubcategoryDto);
  }

  @Post('languages/load')
  bulkCreateLanguage(@Body() createLanguageDto: CreateLanguageDto[]) {
    return this.miscService.bulkCreateLanguage(createLanguageDto);
  }

  @Post('types/load')
  bulkCreateType(@Body() createTypeDto: CreateTypeDto[]) {
    return this.miscService.bulkCreateType(createTypeDto);
  }

  @Post('times/load')
  bulkCreateTime(@Body() createTimeDto: CreateTimeDto[]) {
    return this.miscService.bulkCreateTime(createTimeDto);
  }

  @Post('timezones/load')
  bulkCreateTimeZone(@Body() createTimeZoneDto: CreateTimeZoneDto[]) {
    return this.miscService.bulkCreateTimeZone(createTimeZoneDto);
  }

  @Post('capacities/load')
  bulkCreateCapacity(@Body() createCapacityDto: CreateCapacityDto[]) {
    return this.miscService.bulkCreateCapacity(createCapacityDto);
  }

  @Post('visibilities/load')
  bulkCreateVisibility(@Body() createVisibilityDto: CreateVisibilityDto[]) {
    return this.miscService.bulkCreateVisibility(createVisibilityDto);
  }

  /*
  * End Bulk Creating
  ****/

    /****
   * Find All GET
   */

    @Get('categories')
    findAllCategories() {
      return this.miscService.findAllCategories();
    }
  
    @Get('subcategories')
    findAllSubcategories() {
      return this.miscService.findAllSubcategories();
    }
  
    @Get('languages')
    findAllLanguages() {
      return this.miscService.findAllLanguages();
    }
  
    @Get('types')
    findAllTypes() {
      return this.miscService.findAllTypes();
    }
  
    @Get('times')
    findAllTimes() {
      return this.miscService.findAllTimes();
    }
  
    @Get('timezones')
    findAllTimeZones() {
      return this.miscService.findAllTimeZones();
    }
  
    @Get('capacities')
    findAllCapacities() {
      return this.miscService.findAllCapacities();
    }
  
    @Get('visibilities')
    findAllVisibilities() {
      return this.miscService.findAllVisibilities();
    }
  
    /*
    * End Find All
    ****/

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miscService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMiscDto: string) {
    return this.miscService.update(+id, updateMiscDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.miscService.remove(+id);
  }
}
