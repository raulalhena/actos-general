import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto) {
    return await this.eventModel.create(createEventDto);
  }

  async findAll() {
    return await this.eventModel.find();
  }

  async findOne(id: ObjectId) {
    return await this.eventModel.findById(id);
  }

  async update(id: ObjectId, updateEventDto: UpdateEventDto) {
    return await this.eventModel.findByIdAndUpdate(id, updateEventDto, {new: true});
  }

  async delete(id: ObjectId) {
    return await this.eventModel.findByIdAndDelete(id);
  }
}
