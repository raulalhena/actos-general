import { Test, TestingModule } from '@nestjs/testing';
import { TypesService } from './types.service';
import { Model } from 'mongoose';

import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Type } from './schemas/type.schema';

describe('TypesService', () => {
  let service: TypesService;
  let typeModel: Model<Type>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypesService,
        {
          provide: getModelToken(Type.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TypesService>(TypesService);
    typeModel = module.get<Model<Type>>(getModelToken(Type.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createType', () => {
    it('should create a type', async () => {
      const createTypeDto = {
        name: 'Type 1',
        description: 'Description for Type 1',
      };

      typeModel.create = jest.fn().mockResolvedValue(createTypeDto);

      const result = await service.createType(createTypeDto);

      expect(result).toEqual(createTypeDto);
    });
  });

  describe('bulkCreateTypes', () => {
    it('should create multiple types in bulk', async () => {
      const createTypeDtos = [
        {
          name: 'Type 1',
          description: 'Description for Type 1',
        },
        {
          name: 'Type 2',
          description: 'Description for Type 2',
        },
      ];

      typeModel.create = jest.fn().mockResolvedValue(createTypeDtos);

      const result = await service.bulkCreateType(createTypeDtos);

      expect(result).toEqual(createTypeDtos);
    });
  });

  describe('findAllTypes', () => {
    it('should return an array of types', async () => {
      const types = [
        {
          name: 'Type 1',
          description: 'Description for Type 1',
        },
        {
          name: 'Type 2',
          description: 'Description for Type 2',
        },
      ];

      typeModel.find = jest.fn().mockResolvedValue(types);

      const result = await service.findAllTypes();

      expect(result).toEqual(types);
    });
  });

  describe('deleteType', () => {
    it('should delete a type', async () => {
      const typeId = '12345';

      typeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteType(typeId);

      expect(typeModel.deleteOne).toHaveBeenCalledWith({ _id: typeId });
    });

    it('should throw NotFoundException if the type does not exist', async () => {
      const typeId = '12345';

      typeModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteType(typeId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Type with ID ${typeId} not found`);
      }
    });
  });
});
