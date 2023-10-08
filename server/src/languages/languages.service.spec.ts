import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesService } from './languages.service';
import { Model } from 'mongoose';
import { Language } from './schema/language.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('LanguagesService', () => {
  let service: LanguagesService;
  let languageModel: Model<Language>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguagesService,
        {
          provide: getModelToken(Language.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LanguagesService>(LanguagesService);
    languageModel = module.get<Model<Language>>(getModelToken(Language.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLanguage', () => {
    it('should create a language', async () => {
      const createLanguageDto = {
          name: 'English',
          description: 'en',
        };

      languageModel.create = jest.fn().mockResolvedValue(createLanguageDto);

      const result = await service.createLanguage(createLanguageDto);

      expect(result).toEqual(createLanguageDto);
    });
  });

  describe('bulkCreateLanguages', () => {
    it('should create multiple languages in bulk', async () => {
      const createLanguageDtos = [
        {
          name: 'English',
          description: 'en',
        },
        {
          name: 'Spanish',
          description: 'es',
        },
      ];

      languageModel.create = jest.fn().mockResolvedValue(createLanguageDtos);

      const result = await service.bulkCreateLanguages(createLanguageDtos);

      expect(result).toEqual(createLanguageDtos);
    });
  });

  describe('findAllLanguages', () => {
    it('should return an array of languages', async () => {
      const languages = [
        {
          name: 'English',
          code: 'en',
        },
        {
          name: 'Spanish',
          code: 'es',
        },
      ];

      languageModel.find = jest.fn().mockResolvedValue(languages);

      const result = await service.findAllLanguages();

      expect(result).toEqual(languages);
    });
  });

  describe('deleteLanguage', () => {
    it('should delete a language', async () => {
      const languageId = '12345';

      languageModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await service.deleteLanguage(languageId);

      expect(languageModel.deleteOne).toHaveBeenCalledWith({ _id: languageId });
    });

    it('should throw NotFoundException if the language does not exist', async () => {
      const languageId = '12345';

      languageModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      try {
        await service.deleteLanguage(languageId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Language with ID ${languageId} not found`);
      }
    });
  });
});

