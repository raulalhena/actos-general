import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

  @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
      return { 
          imageUrl: file.path
      };
  }

  @Get()
  findAll() {
  	return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
  	return this.eventsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() updateEventDto: UpdateEventDto) {
  	return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
  	return this.eventsService.delete(id);
  }
}
