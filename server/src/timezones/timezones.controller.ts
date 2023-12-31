import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimezonesService } from './timezones.service';
import { CreateTimeZoneDto } from './dto/create-timezone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('timezones')
@Controller('timezones')
export class TimezonesController {
  constructor(private readonly timezonesService: TimezonesService) {}

  @Post()
  createTimezone(@Body() createTimezoneDto: CreateTimeZoneDto) {
    return this.timezonesService.createTimezone(createTimezoneDto);
  }

  @Post('load')
  bulkCreateTimezones(@Body() createTimezoneDto: CreateTimeZoneDto[]) {
    return this.timezonesService.bulkCreateTimezones(createTimezoneDto);
  }

  @Get()
  findAllTimezones() {
    return this.timezonesService.findAllTimezones();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timezonesService.deleteTimezone(id);
  }
}
