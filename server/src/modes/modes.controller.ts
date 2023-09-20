import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModesService } from './modes.service';
import { CreateModeDto } from './dto/create-mode.dto';
import { UpdateModeDto } from './dto/update-mode.dto';

@Controller('modes')
export class ModesController {
  constructor(private readonly modesService: ModesService) {}

  @Post()
  create(@Body() createModeDto: CreateModeDto) {
    return this.modesService.create(createModeDto);
  }

  @Get()
  findAll() {
    return this.modesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeDto: UpdateModeDto) {
    return this.modesService.update(+id, updateModeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modesService.remove(+id);
  }
}
