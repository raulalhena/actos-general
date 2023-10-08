import { Test, TestingModule } from '@nestjs/testing';
import { CapacitiesService } from './capacities.service';
import { Model } from 'mongoose';
import { Capacity } from './schema/capacity.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('CapacitiesService', () => {
  let service: CapacitiesService;
  let capacityModel: Model<Capacity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CapacitiesService,
        {
          provide: getModelToken(Capacity.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CapacitiesService>(CapacitiesService);
    capacityModel = module.get<Model<Capacity>>(getModelToken(Capacity.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCapacity', () => {
    it('should create a capacity', async () => {
      const createCapacityDto = {
        name: 'Capacity 1',
        description: 'Description for Capacity 1',
      };

      capacityModel.create = jest.fn().mockResolvedValue(createCapacityDto);

      const result = await service.createCapacity(createCapacityDto);

      expect(result).toEqual(createCapacityDto);
    });
  });

  describe('bulkCreateCapacities', () => {
    it('should create multiple capacities in bulk', async () => {
      const createCapacityDtos = [
        {
          name: 'Capacity 1',
          description: 'Description for Capacity 1',
        },
        {
          name: 'Capacity 2',
          description: 'Description for Capacity 2',
        },
      ];

      capacityModel.create = jest.fn().mockResolvedValue(createCapacityDtos);

      const result = await service.bulkCreateCapacities(createCapacityDtos);

      expect(result).toEqual(createCapacityDtos);
    });
  });

  describe('findAllCapacities', () => {
    it('should return an array of capacities', async () => {
      const capacities = [
        {
          name: 'Capacity 1',
          description: 'Description for Capacity 1',
        },
        {
          name: 'Capacity 2',
          description: 'Description for Capacity 2',
        },
      ];

      capacityModel.find = jest.fn().mockResolvedValue(capacities);

      const result = await service.findAllCapacities();

      expect(result).toEqual(capacities);
    });
  });

  describe('deleteCapacity', () => {
    it('should delete a capacity', async () => {
      const capacityId = '12345';

      capacityModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteCapacity(capacityId);

      expect(capacityModel.deleteOne).toHaveBeenCalledWith({ _id: capacityId });
    });

    it('should throw NotFoundException if the capacity does not exist', async () => {
      const capacityId = '12345';

      capacityModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteCapacity(capacityId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Capacity with ID ${capacityId} not found`);
      }
    });
  });
});
