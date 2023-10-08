import { Test, TestingModule } from '@nestjs/testing';
import { VisibilitiesService } from './visibilities.service';
import { Model } from 'mongoose';
import { Visibility } from './schema/visibility.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('VisibilitiesService', () => {
  let service: VisibilitiesService;
  let visibilityModel: Model<Visibility>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisibilitiesService,
        {
          provide: getModelToken(Visibility.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VisibilitiesService>(VisibilitiesService);
    visibilityModel = module.get<Model<Visibility>>(getModelToken(Visibility.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createVisibility', () => {
    it('should create a visibility', async () => {
      const createVisibilityDto = {
        name: 'Visibility 1',
        description: 'Description for Visibility 1',
      };

      visibilityModel.create = jest.fn().mockResolvedValue(createVisibilityDto);

      const result = await service.createVisibility(createVisibilityDto);

      expect(result).toEqual(createVisibilityDto);
    });
  });

  describe('bulkCreateVisibilities', () => {
    it('should create multiple visibilities in bulk', async () => {
      const createVisibilityDtos = [
        {
          name: 'Visibility 1',
          description: 'Description for Visibility 1',
        },
        {
          name: 'Visibility 2',
          description: 'Description for Visibility 2',
        },
      ];

      visibilityModel.create = jest.fn().mockResolvedValue(createVisibilityDtos);

      const result = await service.bulkCreateVisibilities(createVisibilityDtos);

      expect(result).toEqual(createVisibilityDtos);
    });
  });

  describe('findAllVisibilities', () => {
    it('should return an array of visibilities', async () => {
      const visibilities = [
        {
          name: 'Visibility 1',
          description: 'Description for Visibility 1',
        },
        {
          name: 'Visibility 2',
          description: 'Description for Visibility 2',
        },
      ];

      visibilityModel.find = jest.fn().mockResolvedValue(visibilities);

      const result = await service.findAllVisibilities();

      expect(result).toEqual(visibilities);
    });
  });

  describe('deleteVisibility', () => {
    it('should delete a visibility', async () => {
      const visibilityId = '12345';

      visibilityModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteVisibility(visibilityId);

      expect(visibilityModel.deleteOne).toHaveBeenCalledWith({ _id: visibilityId });
    });

    it('should throw NotFoundException if the visibility does not exist', async () => {
      const visibilityId = '12345';

      visibilityModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteVisibility(visibilityId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Visibility with ID ${visibilityId} not found`);
      }
    });
  });
});

