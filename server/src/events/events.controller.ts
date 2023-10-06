import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { Header } from '@nestjs/common';
import { EventInscriptionDto } from './dto/event-inscription.dto';
import { EventUnsubscriptionDto } from './dto/event-unsubscription.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

  @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

  @Put('attendance/:eventId/:userId')
    attendanceRecord(@Param('eventId') eventId: ObjectId, @Param('userId') userId: ObjectId) {
      return this.eventsService.attendanceRecord(eventId, userId);
    }

  @Put('inscription')
  eventInscription(@Body() eventInscriptionDto: EventInscriptionDto) {
    return this.eventsService.eventInscription(eventInscriptionDto)
  }

  @Put('online')
  eventInscriptionOnline(@Body() eventInscriptionDto: EventInscriptionDto) {
    return this.eventsService.eventInscriptionOnline(eventInscriptionDto)
  }

  @Put('unsubscribe-online')
  eventUnsubscriptionOnline(@Body() eventInscriptionDto: EventInscriptionDto) {
    return this.eventsService.eventUnsubscriptionOnline(eventInscriptionDto)
  }

  @Put('unsubscription')
  eventUnsubscription(@Body() eventUnsubscriptionDto: EventUnsubscriptionDto ) {
    return this.eventsService.eventUnsubscription(eventUnsubscriptionDto);
  }

  @Get()
  findAll() {
  	return this.eventsService.findAll();
  }

  @Get('home')
  homePageEvents() {
  	return this.eventsService.homePageEvents();
  }

  @Get('search')
  search(@Query() query) {
  	return this.eventsService.search(query.filters, query.keywords);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
  	return this.eventsService.findOne(id);
  }

  @Get('/:id/submitted')
  submitted(@Param('id') id: ObjectId, @Query() query) {
    return this.eventsService.getSubmitted(id, query.mode);
  }

  @Get('/user/:id')
  findUserEvents(@Param('id') id: ObjectId) {
    return this.eventsService.findUserEvents(id);
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
