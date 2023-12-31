import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CapacitiesService } from './capacities.service';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('capacities')
@Controller('capacities')
export class CapacitiesController {
  constructor(private readonly capacitiesService: CapacitiesService) {}

  @Post()
  createCapacity(@Body() createCapacityDto: CreateCapacityDto) {
    return this.capacitiesService.createCapacity(createCapacityDto);
  }

  @Post('load')
  bulkCreateCapacities(@Body() createCapacityDto: CreateCapacityDto[]) {
    return this.capacitiesService.bulkCreateCapacities(createCapacityDto);
  }

  @Get()
  findAllCapacities() {
    return this.capacitiesService.findAllCapacities();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capacitiesService.deleteCapacity(id);
  }
}
