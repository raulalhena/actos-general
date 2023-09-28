import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Schema, Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { generateEventQR } from '../utils/qr.generator';
import { UpdateEventDto } from './dto/update-event.dto';

const svgQR = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 39 39\"><path d=\"M1 1h7v7h-7zM10 1h3v1h-2v3h-1v1h1v-1h1v-2h2v1h-1v1h3v1h1v1h-1v1h-1v-1h-1v1h-1v-2h-1v3h-1v1h-1v-1h-1v-6h1zM14 1h1v1h-1zM16 1h2v1h-2zM23 1h3v3h1v1h-2v-1h-3v-1h-1v-1h2v1h2v-1h-2zM29 1h1v7h-1v-1h-1v2h2v1h-3v2h-1v-1h-2v-1h2v-1h1v-4h1v1h1v-1h-1v-2h-1v-1h2zM31 1h7v7h-7zM2 2v5h5v-5zM19 2h1v1h-1zM32 2v5h5v-5zM3 3h3v3h-3zM16 3h2v1h-1v1h-1zM33 3h3v3h-3zM18 4h1v3h-1v-1h-1v-1h1zM20 5h2v1h1v1h-1v1h1v2h-1v-1h-1v1h-1v-1h-2v1h-1v1h1v1h-1v2h-1v1h1v1h-1v1h-2v2h-1v-3h1v-1h1v-2h1v-1h-3v-1h1v-1h2v-1h1v-2h1v1h1v-1h1v1h1v-2h-1zM24 5h1v1h-1zM25 6h1v3h-1zM10 7v1h1v-1zM23 7h1v1h-1zM14 8h1v1h-1zM1 9h1v2h-1zM3 9h5v1h-1v1h-1v-1h-2v1h-1zM12 9h2v1h-2zM31 9h5v1h-5zM8 10h1v1h-1zM11 10h1v1h-1zM19 10h1v1h-1zM21 10h1v1h-1zM30 10h1v3h1v1h-2v1h2v1h2v2h-1v-1h-1v1h-3v-2h-1v-1h1v-1h-1v-3h1v2h1zM36 10h1v1h1v3h-1v1h-1v-1h-1v-1h2v-1h-2v1h-1v-1h-1v-1h3zM2 11h1v1h1v1h-1v1h-2v-1h1zM4 11h1v1h-1zM7 11h1v1h-1zM20 11h1v1h2v-1h1v2h1v2h-1v-1h-1v-1h-2v2h-1v-2h-1v-1h1zM10 12h1v1h1v-1h1v1h1v1h-2v1h-1v-1h-2v1h-1v-1h-2v-1h4zM25 12h1v1h-1zM32 12h1v1h-1zM18 13h1v1h-1zM26 13h1v1h-1zM33 13h1v1h-1zM3 14h2v1h-2zM17 14h1v1h-1zM27 14h1v1h-1zM32 14h1v1h-1zM7 15h1v1h-1zM12 15h1v1h-1zM19 15h1v1h-1zM21 15h1v1h-1zM23 15h1v1h-1zM26 15h1v1h-1zM34 15h1v1h-1zM37 15h1v1h-1zM4 16h1v1h1v-1h1v1h1v-1h1v1h2v1h1v1h-1v1h-1v-2h-1v1h-1v-1h-4zM17 16h1v1h-1zM20 16h1v1h-1zM25 16h1v1h-1zM27 16h1v2h-1v1h-3v-1h2v-1h1zM30 16v1h1v-1zM36 16h1v3h1v2h-1v-1h-1v-2h-1v-1h1zM2 17h1v1h1v2h-1v-1h-1v1h1v1h-2v-3h1zM19 17h1v1h-1zM21 17h3v1h-1v1h1v3h1v1h-2v1h2v2h1v2h-1v-1h-1v1h-1v-1h-2v-1h1v-1h-1v-1h1v-1h-3v1h1v1h-2v-1h-1v1h1v1h-1v1h1v1h-1v2h-1v-4h-2v1h-1v-1h-1v-1h1v-1h1v1h2v-1h-1v-1h2v-1h1v-1h1v1h2v-1h1v1h1v-1h-1v-1h-1v-1h1v-1h-1zM15 18h3v1h-3zM32 18h1v1h-1zM5 19h3v1h-1v1h1v1h-2v2h1v1h1v-1h1v-1h1v1h2v1h-1v2h1v1h-2v-1h-1v2h1v1h1v1h-2v-1h-2v-1h1v-1h-1v-1h1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v1h-1v3h-1v-4h1v-1h-1v-3h2v1h-1v1h1v1h1v-1h-1v-1h2v-1h-2v-1h3v-1h-1zM12 19h1v1h-1zM14 19h1v1h1v2h-1v-1h-1zM28 19h1v2h-1zM31 19h1v1h-1zM33 19h1v1h-1zM8 20h2v1h-2zM11 20h1v1h-1zM17 20h1v1h-1zM19 20h1v1h-1zM30 20h1v1h1v1h-2zM32 20h1v1h-1zM34 20h1v1h-1zM25 21h2v1h-2zM33 21h1v1h-1zM35 21h1v1h-1zM12 22h2v1h-2zM27 22h1v1h-1zM29 22h1v1h-1zM32 22h1v1h1v-1h1v3h-1v1h-1v-1h-1v-1h-2v-1h2zM7 23h1v1h-1zM26 23h1v1h-1zM28 23h1v2h-1v1h-2v-1h1v-1h1zM37 23h1v3h-3v-1h1v-1h1zM23 25v1h1v-1zM29 25h1v1h-1zM31 25h1v1h-1zM19 26h1v1h-1zM30 26h1v1h-1zM32 26h1v2h-1v1h1v-1h1v1h3v-1h-1v-1h2v3h-2v1h2v1h-1v1h-1v-1h-1v1h1v1h-2v1h-1v-1h-1v1h-2v-1h-1v1h-2v-1h1v-1h1v-2h-2v-1h1v-3h1v2h1v-1h1v-1h1zM34 26h1v2h-1zM3 27h1v1h1v1h-1v1h-1zM5 27h1v1h-1zM20 27h1v1h2v1h-1v2h-2v1h-1v-2h1zM6 28h1v1h-1zM12 28h2v2h1v1h-2v-1h-2v-1h1zM5 29h1v1h-1zM18 29h1v1h-1zM23 29h1v1h-1zM25 29h2v1h-1v1h1v1h-1v1h1v1h-2v-3h-1v-1h1zM17 30h1v1h-1zM30 30v3h3v-3zM1 31h7v7h-7zM12 31h1v1h1v2h1v-2h1v-1h1v1h1v1h-1v1h2v2h-1v-1h-2v3h-1v-1h-1v1h-5v-1h1v-1h-1v-4h3zM23 31h1v1h-1zM31 31h1v1h-1zM2 32v5h5v-5zM20 32h2v1h2v1h-1v1h1v3h-1v-1h-1v-1h-1v-1h1v-1h-3v-1h1zM3 33h3v3h-3zM10 33v2h1v-1h1v2h-1v1h1v-1h3v-1h-2v-2zM37 33h1v5h-3v-1h2v-1h-1v-1h1zM24 34h1v1h-1zM25 35h1v1h-1zM29 35h1v2h-1zM17 36h1v1h-1zM19 36h1v1h-1zM31 36h4v1h-1v1h-2v-1h-1zM18 37h1v1h-1zM26 37h1v1h-1zM28 37h1v1h-1z\"/></svg>';

const eventResult = {
  _id: new Types.ObjectId('650e9ff4f20805eccb4d5928'),
  name: 'Event',
  category: 'Employ',
  subcategory: 'Sub',
  tags: [],
  mode: '',
  type: 'Taller',
  address: '', 
  webLink: '', 
  date: new Date('2023-05-21').toISOString().split('T')[0],
  startTime: '22:00',
  endTime: '23:00',
  timeZone: '',
  showTime: false,
  showDate: false,
  confirmed: false, 
  description: '',
  web: '', 
  organizedBy: [], 
  contactEmail: '',
  isPrivate: false,
  language: [], //Select con checkbox
  image: '', 
  video: '', 
  capacity: 0,
  isLimited: false,
  qrEvent: svgQR,
  qrAttendees: [],
  attendees: [],
  submitted: [],
  price: 0,
  payment: '', 
  visibility: false,
  status: false,
  active: false,
  customForm: '',
  form: {}
}

const newEvent: CreateEventDto = {
  name: 'Event',
  category: 'Employ',
  subcategory: 'Sub',
  tags: [],
  mode: '',
  type: 'Taller',
  address: '', 
  webLink: '', 
  date: new Date('2023-05-21').toISOString().split('T')[0],
  startTime: '22:00',
  endTime: '23:00',
  timeZone: '',
  showTime: false,
  showDate: false,
  confirmed: false, 
  description: '',
  web: '', 
  organizedBy: [], 
  contactEmail: '',
  isPrivate: false,
  language: [], //Select con checkbox
  image: '', 
  video: '', 
  capacity: 0,
  isLimited: false,
  qrEvent: '',
  qrAttendees: [],
  attendees: [],
  submitted: [],
  price: 0,
  payment: '', 
  visibility: false,
  status: false,
  active: false,
  customForm: '',
  form: {}
}

describe('EventsController', () => {
  let controller: EventsController;

  const mockEventsService = {
    create: jest.fn().mockImplementation(async (newEvent: CreateEventDto) => {
      eventResult.qrEvent = await generateEventQR(eventResult._id);
      return eventResult;
    }),
    attendanceRecord: jest.fn().mockReturnValue('El registro de usuario se ha realizado con éxito'),

    findAll: jest.fn().mockResolvedValue(eventResult),

    findOne: jest.fn().mockResolvedValue(eventResult),

    update: jest.fn().mockImplementation((updateEvent:UpdateEventDto) => {
      return {
        ...eventResult,
        visibility: true
      }
    }),

    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService, 
        {
          provide: getModelToken(Event.name),
          useValue: {}
        }
    ],
    })
      .overrideProvider(EventsService)
			.useValue(mockEventsService)
			.compile();
    

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create() POST should return Event Object', async () => {
    expect(await controller.create(newEvent)).toMatchObject({
      _id: expect.any(Types.ObjectId),
      qrEvent: eventResult.qrEvent
    });
  });

  it('attendanceRecord() PUT should return string: "El registro de usuario se ha realizado con éxito"', async () => {
    const id = new mongoose.Schema.Types.ObjectId('6507ba93e26e19f95d031e89');
    const userId = new mongoose.Schema.Types.ObjectId('6507ba93e26e19f95d031e89');
    expect(await controller.attendanceRecord(id, userId)).toMatch('El registro de usuario se ha realizado con éxito');
  });

  it('findAll() should return all events',async () => {
    expect(await controller.findAll()).toMatchObject(eventResult)
  })

  it('findOne() should return an event',async () => {
    const id = new mongoose.Schema.Types.ObjectId('6507ba93e26e19f95d031e89');
    expect(await controller.findOne(id)).toMatchObject(eventResult)
  })

  it('update() should update an event',async () => {
    const id = new Schema.Types.ObjectId('65117aaea34fb2e66796de6e')
    const updateEventDto: UpdateEventDto = {
      visibility: true,
    }
    expect(await controller.update(id, updateEventDto)).toMatchObject({
      ...eventResult,
      visibility: true
    })
  })

  it('delete() should delete an event',async () => {
    const id = new Schema.Types.ObjectId('65117aaea34fb2e66796de6e')
    expect(await controller.delete(id))
  })
});
