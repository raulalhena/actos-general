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
   * Find All
   */

  @Get('categories')
  findAllCategories() {
    return this.miscService.findAll();
  }

  @Get('subcategories')
  findAllSubcategories() {
    return this.miscService.findAll();
  }

  @Get('languages')
  findAll() {
    return this.miscService.findAll();
  }

  @Get('types')
  findAllTypes() {
    return this.miscService.findAll();
  }

  @Get('times')
  findAllTimes() {
    return this.miscService.findAll();
  }

  @Get('timezones')
  findAllTimeZones() {
    return this.miscService.findAll();
  }

  @Get('capacities')
  findAllCapacities() {
    return this.miscService.findAll();
  }

  @Get('visibilities')
  findAllVisibilities() {
    return this.miscService.findAll();
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
