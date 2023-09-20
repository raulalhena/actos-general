import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MiscService } from './misc.service';
import { CreateMiscDto } from './dto/create-misc.dto';
import { UpdateMiscDto } from './dto/update-misc.dto';

@Controller('misc')
export class MiscController {
  constructor(private readonly miscService: MiscService) {}

  @Post()
  create(@Body() createMiscDto: CreateMiscDto) {
    return this.miscService.create(createMiscDto);
  }

  @Get()
  findAll() {
    return this.miscService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miscService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMiscDto: UpdateMiscDto) {
    return this.miscService.update(+id, updateMiscDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.miscService.remove(+id);
  }
}
