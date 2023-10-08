import { Test, TestingModule } from '@nestjs/testing';
import { TimesService } from './times.service';
import { Model } from 'mongoose';
import { Time } from './schema/time.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('TimesService', () => {
  let service: TimesService;
  let timeModel: Model<Time>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimesService,
        {
          provide: getModelToken(Time.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TimesService>(TimesService);
    timeModel = module.get<Model<Time>>(getModelToken(Time.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTime', () => {
    it('should create a time', async () => {
      const createTimeDto = {
        name: 'Time 1',
        description: 'Description for Time 1',
      };

      timeModel.create = jest.fn().mockResolvedValue(createTimeDto);

      const result = await service.createTime(createTimeDto);

      expect(result).toEqual(createTimeDto);
    });
  });

  describe('bulkCreateTimes', () => {
    it('should create multiple times in bulk', async () => {
      const createTimeDtos = [
        {
          name: 'Time 1',
          description: 'Description for Time 1',
        },
        {
          name: 'Time 2',
          description: 'Description for Time 2',
        },
      ];

      timeModel.create = jest.fn().mockResolvedValue(createTimeDtos);

      const result = await service.bulkCreateTimes(createTimeDtos);

      expect(result).toEqual(createTimeDtos);
    });
  });

  describe('findAllTimes', () => {
    it('should return an array of times', async () => {
      const times = [
        {
          name: 'Time 1',
          description: 'Description for Time 1',
        },
        {
          name: 'Time 2',
          description: 'Description for Time 2',
        },
      ];

      timeModel.find = jest.fn().mockResolvedValue(times);

      const result = await service.findAllTimes();

      expect(result).toEqual(times);
    });
  });

  describe('deleteTime', () => {
    it('should delete a time', async () => {
      const timeId = '12345';

      timeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteTime(timeId);

      expect(timeModel.deleteOne).toHaveBeenCalledWith({ _id: timeId });
    });

    it('should throw NotFoundException if the time does not exist', async () => {
      const timeId = '12345';

      timeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteTime(timeId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Time with ID ${timeId} not found`);
      }
    });
  });
});
