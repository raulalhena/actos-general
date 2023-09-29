import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import { generateEventQR } from '../utils/qr.generator';


@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}
  

  async saveImage(file: Express.Multer.File) {
    try {
      this.eventModel.findOneAndUpdate({ _id: '650f420a63716b305a350ec7' }, { image: file})
    } catch (error) {
      
    }
  }

  async create(createEventDto: CreateEventDto) {
    try {
      const newEvent = await this.eventModel.create(createEventDto);
      if(!newEvent) throw new HttpException('Error al guardar el evento', HttpStatus.BAD_REQUEST);

      const eventQR = await generateEventQR(new Types.ObjectId(newEvent._id));
      const updatedEvent = await this.eventModel.findOneAndUpdate({ _id: newEvent._id }, { qrEvent: eventQR }, { new: true });

      return updatedEvent;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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

  async attendanceRecord(eventId: ObjectId, userId: ObjectId) {
    try{
      const userAttendee = await this.eventModel.find({ _id: eventId }).select('attendees').populate('attendees').exec();
      console.log('user', JSON.stringify(userAttendee, null, 4));
      // if(!userAttendee) throw new HttpException('El usuario no está inscrito en el evento', HttpStatus.BAD_REQUEST);
      
      return 'El registro de usuario se ha realizado con éxito';
    } catch(error) {
      throw new HttpException('Error al registrar la asistencia', HttpStatus.BAD_REQUEST);
    }
  }

  async getImage(id: ObjectId) {
    try {
      const event = await this.eventModel.findById({ _id: id });
      
      return Buffer.from(event['image'], 'base64');
    } catch (error) {
      throw new HttpException(error.messge, HttpStatus.BAD_REQUEST);
    }
  }
}
