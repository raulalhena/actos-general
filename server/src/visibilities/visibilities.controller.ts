import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisibilitiesService } from './visibilities.service';
import { CreateVisibilityDto } from './dto/create-visibility.dto';
import { UpdateVisibilityDto } from './dto/update-visibility.dto';

@Controller('visibilities')
export class VisibilitiesController {
  constructor(private readonly visibilitiesService: VisibilitiesService) {}

 
  @Post()
  createVisibility(@Body() createVisibilityDto: CreateVisibilityDto) {
    return this.visibilitiesService.createVisibility(createVisibilityDto);
  }

  @Post('load')
  bulkCreateVisibilities(@Body() createVisibilityDto: CreateVisibilityDto[]) {
    return this.visibilitiesService.bulkCreateVisibilities(createVisibilityDto);
  }

  @Get()
  findAllVisibilities() {
    return this.visibilitiesService.findAllVisibilities();
  }
}