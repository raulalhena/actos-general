import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModesService } from './modes.service';
import { CreateModeDto } from './dto/create-mode.dto';
import { UpdateModeDto } from './dto/update-mode.dto';

@Controller('modes')
export class ModesController {
  constructor(private readonly modesService: ModesService) {}

  @Post()
  createMode(@Body() createModeDto: CreateModeDto) {
    return this.modesService.createMode(createModeDto);
  }

  @Post('load')
  bulkCreateModes(@Body() createModeDto: CreateModeDto[]) {
    return this.modesService.bulkCreateModes(createModeDto);
  }

  @Get()
  findAllModes() {
    return this.modesService.findAllModes();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modesService.deleteMode(id);
  }
}
