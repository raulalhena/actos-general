import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MiscService } from './misc.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateTimeDto } from './dto/create-time.dto';
import { CreateTimeZoneDto } from './dto/create-timezone.dto';
import { CreateVisibilityDto } from './dto/create-visibility.dto';
import { ObjectId } from 'mongoose';
import { CreateModeDto } from './dto/create-mode.dto';
import { CreateActiveDto } from './dto/create-active.dto';

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

  @Put('categories/:id/subcategories')
  createSubcategory(@Param('id') id: ObjectId, @Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.miscService.createSubcategory(id, createSubcategoryDto);
  }

  @Post('languages')
  createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
    return this.miscService.createLanguage(createLanguageDto);
  }

  @Post('types')
  createType(@Body() createTypeDto: CreateTypeDto) {
    return this.miscService.createType(createTypeDto);
  }

  @Post('active')
  createStatus(@Body() createActiveDto: CreateActiveDto) {
    return this.miscService.createActive(createActiveDto);
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

  @Post('modes')
  createMode(@Body() createModeDto: CreateModeDto) {
    return this.miscService.createMode(createModeDto);
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

  @Post('/:id/subcategories/load')
  bulkCreateSubcategory(@Param('id') id: ObjectId, @Body() createSubcategoryDto: CreateSubcategoryDto[]) {
    return this.miscService.bulkCreateSubcategory(id, createSubcategoryDto);
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

    @Get('categories/:id/subcategories')
    findAllSubcategories(@Param('id') id: ObjectId) {
      return this.miscService.findAllSubcategories(id);
    }

    @Get('categories')
    findAllCategories() {
      return this.miscService.findAllCategories();
    }
  
  
    @Get('languages')
    findAllLanguages() {
      return this.miscService.findAllLanguages();
    }
  
    @Get('types')
    findAllTypes() {
      return this.miscService.findAllTypes();
    }

    @Get('active')
    findAllStatus() {
      return this.miscService.findAllActive();
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

    @Get('modes')
    findAllModes() {
      return this.miscService.findAllModes();
    }
  
    /*
    * End Find All
    ****/

  // @Put(':id')
  // addImageToSubcategory(@Body() updateSubcategory: UpdateSubcategoryDto) {
  //   return 'not working yet';
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMiscDto: string) {
    return this.miscService.update(+id, updateMiscDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.miscService.remove(+id);
  }
}
