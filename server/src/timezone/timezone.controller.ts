import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimezoneService } from './timezone.service';
import { CreateTimezoneDto } from './dto/create-timezone.dto';
import { UpdateTimezoneDto } from './dto/update-timezone.dto';

@Controller('timezone')
export class TimezoneController {
  constructor(private readonly timezoneService: TimezoneService) {}

  @Post()
  create(@Body() createTimezoneDto: CreateTimezoneDto) {
    return this.timezoneService.create(createTimezoneDto);
  }

  @Get()
  findAll() {
    return this.timezoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timezoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimezoneDto: UpdateTimezoneDto) {
    return this.timezoneService.update(+id, updateTimezoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timezoneService.remove(+id);
  }
}
