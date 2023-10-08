import { Test, TestingModule } from '@nestjs/testing';
import { ActivesService } from './actives.service';
import { Model } from 'mongoose';
import { Active } from './schema/active.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('ActivesService', () => {
  let service: ActivesService;
  let activeModel: Model<Active>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivesService,
        {
          provide: getModelToken(Active.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivesService>(ActivesService);
    activeModel = module.get<Model<Active>>(getModelToken(Active.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createActive', () => {
    it('should create an active', async () => {
      const createActiveDto = {
        name: 'Active 1',
        description: 'Description for Active 1',
      };

      activeModel.create = jest.fn().mockResolvedValue(createActiveDto);

      const result = await service.createActive(createActiveDto);

      expect(result).toEqual(createActiveDto);
    });
  });

  describe('bulkCreateActives', () => {
    it('should create multiple actives in bulk', async () => {
      const createActiveDtos = [
        {
          name: 'Active 1',
          description: 'Description for Active 1',
        },
        {
          name: 'Active 2',
          description: 'Description for Active 2',
        },
      ];

      activeModel.create = jest.fn().mockResolvedValue(createActiveDtos);

      const result = await service.bulkCreateActives(createActiveDtos);

      expect(result).toEqual(createActiveDtos);
    });
  });

  describe('findAllActives', () => {
    it('should return an array of actives', async () => {
      const actives = [
        {
          name: 'Active 1',
          description: 'Description for Active 1',
        },
        {
          name: 'Active 2',
          description: 'Description for Active 2',
        },
      ];

      activeModel.find = jest.fn().mockResolvedValue(actives);

      const result = await service.findAllActives();

      expect(result).toEqual(actives);
    });
  });

  describe('deleteActive', () => {
    it('should delete an active', async () => {
      const activeId = '12345';

      activeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteActive(activeId);

      expect(activeModel.deleteOne).toHaveBeenCalledWith({ _id: activeId });
    });

    it('should throw NotFoundException if the active does not exist', async () => {
      const activeId = '12345';

      activeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteActive(activeId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Active with ID ${activeId} not found`);
      }
    });
  });
});
