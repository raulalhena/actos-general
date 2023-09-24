import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { generateEventQR, generateUserQR } from '../utils/qr.generator';


@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const newEvent = await this.eventModel.create(createEventDto);
      if(newEvent === undefined) throw new HttpException('Error al guardar el evento', HttpStatus.BAD_REQUEST);

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

  async attendanceRecord(id: ObjectId) {
    try{
      let user: User;
      const userAttendee = await this.eventModel.find().select('attendees').populate('attendees');
      console.log('user', userAttendee);
      // if(!userAttendee) throw new HttpException('El usuario no está inscrito en el evento', HttpStatus.BAD_REQUEST);
      
      return 'El registro de usuario se ha realizado con éxito';
    } catch(error) {
      throw new HttpException('Error al registrar la asistencia', HttpStatus.BAD_REQUEST);
    }
  }
}
