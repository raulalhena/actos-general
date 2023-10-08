import { Test, TestingModule } from '@nestjs/testing';
import { TimezonesService } from './timezones.service';
import { Model } from 'mongoose';
import { TimeZone } from './schema/timeZone.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('TimezonesService', () => {
  let service: TimezonesService;
  let timezoneModel: Model<TimeZone>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimezonesService,
        {
          provide: getModelToken(TimeZone.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TimezonesService>(TimezonesService);
    timezoneModel = module.get<Model<TimeZone>>(getModelToken(TimeZone.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTimezone', () => {
    it('should create a timezone', async () => {
      const createTimezoneDto = {
        name: 'Timezone 1',
        description: 'Description for Timezone 1',
      };

      timezoneModel.create = jest.fn().mockResolvedValue(createTimezoneDto);

      const result = await service.createTimezone(createTimezoneDto);

      expect(result).toEqual(createTimezoneDto);
    });
  });

  describe('bulkCreateTimezones', () => {
    it('should create multiple timezones in bulk', async () => {
      const createTimezoneDtos = [
        {
          name: 'Timezone 1',
          description: 'Description for Timezone 1',
        },
        {
          name: 'Timezone 2',
          description: 'Description for Timezone 2',
        },
      ];

      timezoneModel.create = jest.fn().mockResolvedValue(createTimezoneDtos);

      const result = await service.bulkCreateTimezones(createTimezoneDtos);

      expect(result).toEqual(createTimezoneDtos);
    });
  });

  describe('findAllTimezones', () => {
    it('should return an array of timezones', async () => {
      const timezones = [
        {
          name: 'Timezone 1',
          description: 'Description for Timezone 1',
        },
        {
          name: 'Timezone 2',
          description: 'Description for Timezone 2',
        },
      ];

      timezoneModel.find = jest.fn().mockResolvedValue(timezones);

      const result = await service.findAllTimezones();

      expect(result).toEqual(timezones);
    });
  });

  describe('deleteTimezone', () => {
    it('should delete a timezone', async () => {
      const timezoneId = '12345';

      timezoneModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteTimezone(timezoneId);

      expect(timezoneModel.deleteOne).toHaveBeenCalledWith({ _id: timezoneId });
    });

    it('should throw NotFoundException if the timezone does not exist', async () => {
      const timezoneId = '12345';

      timezoneModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteTimezone(timezoneId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Timezone with ID ${timezoneId} not found`);
      }
    });
  });
});
