import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';

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
    create: jest.fn().mockImplementation((newEvent: CreateEventDto) => {
      return eventResult;
    }),
    attendanceRecord: jest.fn().mockReturnValue('El registro de usuario se ha realizado con éxito')
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
      _id: expect.any(Types.ObjectId)
    });
  });

  it('attendanceRecord() PUT should return string: "El registro de usuario se ha realizado con éxito"', async () => {
    const id = new mongoose.Schema.Types.ObjectId('6507ba93e26e19f95d031e89');
    expect(await controller.attendanceRecord(id)).toMatch('El registro de usuario se ha realizado con éxito');
  });
});
