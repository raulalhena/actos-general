import { Test, TestingModule } from '@nestjs/testing';
import { ModesService } from './modes.service';
import { Model } from 'mongoose';
import { Mode } from './schema/mode.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('ModesService', () => {
  let service: ModesService;
  let modeModel: Model<Mode>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModesService,
        {
          provide: getModelToken(Mode.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ModesService>(ModesService);
    modeModel = module.get<Model<Mode>>(getModelToken(Mode.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMode', () => {
    it('should create a mode', async () => {
      const createModeDto = {
        name: 'Mode 1',
        description: 'Description for Mode 1',
      };

      modeModel.create = jest.fn().mockResolvedValue(createModeDto);

      const result = await service.createMode(createModeDto);

      expect(result).toEqual(createModeDto);
    });
  });

  describe('bulkCreateModes', () => {
    it('should create multiple modes in bulk', async () => {
      const createModeDtos = [
        {
          name: 'Mode 1',
          description: 'Description for Mode 1',
        },
        {
          name: 'Mode 2',
          description: 'Description for Mode 2',
        },
      ];

      modeModel.create = jest.fn().mockResolvedValue(createModeDtos);

      const result = await service.bulkCreateModes(createModeDtos);

      expect(result).toEqual(createModeDtos);
    });
  });

  describe('findAllModes', () => {
    it('should return an array of modes', async () => {
      const modes = [
        {
          name: 'Mode 1',
          description: 'Description for Mode 1',
        },
        {
          name: 'Mode 2',
          description: 'Description for Mode 2',
        },
      ];

      modeModel.find = jest.fn().mockResolvedValue(modes);

      const result = await service.findAllModes();

      expect(result).toEqual(modes);
    });
  });

  describe('deleteMode', () => {
    it('should delete a mode', async () => {
      const modeId = '12345';

      modeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteMode(modeId);

      expect(modeModel.deleteOne).toHaveBeenCalledWith({ _id: modeId });
    });

    it('should throw NotFoundException if the mode does not exist', async () => {
      const modeId = '12345';

      modeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteMode(modeId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Mode with ID ${modeId} not found`);
      }
    });
  });
});
