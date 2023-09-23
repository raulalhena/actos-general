import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Types } from 'mongoose';

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

describe('EventsService', () => {
  let service: EventsService;

  const mockEventsService = {
    create: jest.fn().mockImplementation((newEvent: CreateEventDto) => {
      return eventResult;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService,],
    })
      .overrideProvider(EventsService)
      .useValue(mockEventsService)
      .compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() POST should return Event Object', async () => {
    expect(await service.create(newEvent)).toMatchObject({
      _id: expect.any(Types.ObjectId)
    });
  });

});
