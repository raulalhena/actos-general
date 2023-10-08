import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  createType(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.createType(createTypeDto);
  }

  @Post('load')
  bulkCreateType(@Body() createTypeDto: CreateTypeDto[]) {
    return this.typesService.bulkCreateType(createTypeDto);
  }

  @Get()
  findAll() {
    return this.typesService.findAllTypes();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.deleteType(id);
  }

}
