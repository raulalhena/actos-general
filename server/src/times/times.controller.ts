import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesService } from './times.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

@Controller('times')
export class TimesController {
  constructor(private readonly timesService: TimesService) {}
  @Post()
  createTime(@Body() createTimeDto: CreateTimeDto) {
    return this.timesService.createTime(createTimeDto);
  }

  @Post('load')
  bulkCreateTimes(@Body() createTimeDto: CreateTimeDto[]) {
    return this.timesService.bulkCreateTimes(createTimeDto);
  }

  @Get()
  findAllTimes() {
    return this.timesService.findAllTimes();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesService.deleteTime(id);
  }
}
