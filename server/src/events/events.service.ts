import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import { generateEventQR, generateUserQR } from '../utils/qr.generator';
import { EventInscriptionDto } from './dto/event-inscription.dto';
import { EventUnsubscriptionDto } from './dto/event-unsubscription.dto';
import { buffer } from 'stream/consumers';
import { AttendanceRecordDto } from './dto/event-attendance-record.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private userService: UsersService
  ) {}
  

  async saveImage(id: ObjectId, file: Express.Multer.File) {
    try {
      this.eventModel.findOneAndUpdate({ _id: id }, { image: file})
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createEventDto: CreateEventDto) {
    try {
      const newEvent = await this.eventModel.create(createEventDto);
      if(!newEvent) throw new HttpException('Error al guardar el evento', HttpStatus.BAD_REQUEST);

      const eventQR = await generateEventQR(new Types.ObjectId(newEvent._id));
      const buff = Buffer.from(eventQR);
      const base64qr = 'data:image/png;base64,' + buff.toString('base64');
      const updatedEvent = await this.eventModel.findOneAndUpdate({ _id: newEvent._id }, { qrEvent: base64qr }, { new: true });

      return updatedEvent;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.eventModel.find({active: true, visibility: true});
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async homePageEvents() {
    try {
      return await this.eventModel.find({active: true, visibility: true}).sort({_id: -1}).limit(6);;
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: ObjectId) {
    try {
      return await this.eventModel.findById({ _id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserEvents(id: ObjectId) {
    try{
      const userEvents = await this.eventModel.find({ 'submitted.userId': id });

      return userEvents;
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserEventsOnline(id: ObjectId) {
    try{
      const userEvents = await this.eventModel.find({ 'submittedOnline.userId': id });

      return userEvents;
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserEventsHybrid(id: ObjectId) {
    try{
      const userEvents = await this.eventModel.find({ $or: [
        { 'submitted.userId': id },
        { 'submittedOnline.userId': id }
      ] });

      return userEvents;
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: ObjectId, updateEventDto: UpdateEventDto) {
    return await this.eventModel.findByIdAndUpdate(id, updateEventDto, {new: true});
  }

  async delete(id: ObjectId) {
    return await this.eventModel.findByIdAndDelete(id);
  }

  async attendanceRecord(eventId: ObjectId, userId: ObjectId) {
    try{
      const updateData = {
        $push: {
          attendees: userId
        }
      }

      const event = await this.eventModel.findOne({ _id: eventId });

      const userIn = event['attendees'].filter(user => {
        if(user._id.toString() === userId) return user;
      });

      const user = await this.userService.findById(userId).select('name surname email').lean();
      
      if(userIn.length > 0){
         throw new HttpException(`Ya se ha accedido con este QR. Usuario: ${user.name} ${user.surname} Email: ${user.email}.`, HttpStatus.BAD_REQUEST);
      } else {
        const eventUpdated = await this.eventModel.findOneAndUpdate({ _id: eventId }, updateData, { new: true});
      }
      
      return { 
        message: `Registro realizado con éxito. Usuario: ${user.name} ${user.surname} Email: ${user.email}`,
      }
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getImage(id: ObjectId) {
    try {
      const event = await this.eventModel.findById({ _id: id });
      
      return Buffer.from(event['image'], 'base64');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  async eventInscription(eventInscriptionDto: EventInscriptionDto) {
    try {
      const userQR = await generateUserQR(eventInscriptionDto.eventId, eventInscriptionDto.userId);
      const buff = Buffer.from(userQR);
      const base64qr = 'data:image/png;base64,' + buff.toString('base64');

      const updateData = {
        $push: { 
          submitted: { 
            userId: eventInscriptionDto.userId,  
            qrUser: base64qr
          }
        }
      }
      const updateEventSubmitted = await this.eventModel.findOneAndUpdate({ _id: eventInscriptionDto.eventId }, updateData, { new: true })

      return updateEventSubmitted;
    } catch (error) {
      throw error
    }
  }

  async eventInscriptionOnline(eventInscriptionDto: EventInscriptionDto) {
    try {
      const updateData = {
        $push: { submittedOnline: { userId: eventInscriptionDto.userId } }
      };
      const updateEventSubmitted = await this.eventModel.findOneAndUpdate({ _id: eventInscriptionDto.eventId }, updateData, { new: true })

      return updateEventSubmitted
    } catch (error) {
      throw error
    }
  }

  async eventUnsubscriptionOnline(eventUnsubscriptionDto: EventUnsubscriptionDto) {
    try {
      const unsuscribedEvent = { 
        $pull: { submittedOnline: { userId: eventUnsubscriptionDto.userId } }
      };

      const updatedUnsuscribedEvent = await this.eventModel.findByIdAndUpdate({ _id: eventUnsubscriptionDto.eventId }, unsuscribedEvent, { new: true });

      return updatedUnsuscribedEvent;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async eventUnsubscription(eventUnsubscriptionDto: EventUnsubscriptionDto) {
    try {
      const unsuscribedEvent = { 
        $pull: { 'submitted': { userId: eventUnsubscriptionDto.userId }}
      };

      const updatedUnsuscribedEvent = await this.eventModel.findByIdAndUpdate({ _id: eventUnsubscriptionDto.eventId }, unsuscribedEvent, { new: true });
      return updatedUnsuscribedEvent;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSubmitted(id: ObjectId, mode: string) {
    try {
      // let submittedList;
      let submittedMode = '';
      if(mode === 'En Línea') submittedMode = 'Online';
      
      const submittedList = await this.eventModel.find({ _id: id }).select(`submitted${submittedMode}.userId`).populate({ 
        path: `submitted${submittedMode}.userId`, 
        select: ['name', 'surname', 'email'] 
      });
      
      return submittedList[0]['submitted'];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async search(filters: string, keywords: string) {
		try {
			let allevents = [];
			let regex;
			const arrFilters =  filters.split(',');

			for await (const filter of arrFilters) {
					regex = new RegExp(keywords, 'i');
           if(!isNaN(+keywords)) {
					regex = +keywords;
				}
				allevents.push(...await this.eventModel.find({ [filter] : regex }));
			}

			allevents = allevents.flat(Infinity);

			const hash = {};
			const filteredEvents = allevents.filter((event) => {
				return hash[event._id] ? false : (hash[event._id] = true);
			});

			return {
				message: 'Retrieved filtered events successfully',
				status: HttpStatus.OK,
				data: filteredEvents,
			};
		} catch (error) {
			throw error;
		}
	}
}
