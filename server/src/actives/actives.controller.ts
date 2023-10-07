import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivesService } from './actives.service';
import { CreateActiveDto } from './dto/create-active.dto';
import { UpdateActiveDto } from './dto/update-active.dto';

@Controller('actives')
export class ActivesController {
  constructor(private readonly activesService: ActivesService) {}

  @Post()
  createActive(@Body() createActiveDto: CreateActiveDto) {
    return this.activesService.createActive(createActiveDto);
  }

  @Post('load')
  bulkCreateActives(@Body() createActiveDto: CreateActiveDto[]) {
    return this.activesService.bulkCreateActives(createActiveDto);
  }

  @Get()
  findAllActives() {
    return this.activesService.findAllActives();
  }
}