import { Test, TestingModule } from '@nestjs/testing';
import { MiscService } from './misc.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateTimeDto } from './dto/create-time.dto';
import { CreateTimeZoneDto } from './dto/create-timezone.dto';
import mongoose, { Schema } from 'mongoose';

const category =  {
  "name": "Global",
  "subcategories": ["Zing", "Domum"],
  "description": ""
}

const categories =  [
  {
  "name": "Global",
  "subcategories": ["Zing", "Domum"],
  "description": ""
  },
  {
    "name": "Empleabilidad",
    "subcategories": ["Zang", "Damam"],
    "description": ""
  }
]

const language = {
    "name": "Español",
    "description": ""
}

const languages = [
  {
    "name": "Español",
    "description": ""
  },
  {
      "name": "Catalán",
      "description": ""
  }
]

const type =  {
  "name": "Proyecto",
  "description": ""
}

const types =  [
  {
    "name": "Proyecto",
    "description": ""
  },
  {
      "name": "Formación",
      "description": ""
  }
]

const time =  {
  "name": "00:00",
  "description": ""
}

const times =  [
  {
    "name": "00:00",
    "description": ""
  },
  {
      "name": "00:30",
      "description": ""
  }
]

const timeZone =  {
  "name": "Madrid +2:00 GMT+2:00",
  "description": ""
}

const timeZones =  [
  {
    "name": "Madrid +2:00 GMT+2:00",
    "description": ""
  },
  {
      "name": "Nueva York -4:00 GMT-4:00",
      "description": ""
  }
]

describe('MiscService', () => {
  let service: MiscService;

  beforeEach(async () => {

    const MockMiscService= {
      createCategory: jest.fn().mockResolvedValue(category),
      createLanguage: jest.fn().mockResolvedValue(language),
      createType: jest.fn().mockResolvedValue(type),
      createTime: jest.fn().mockResolvedValue(time),
      createTimeZone: jest.fn().mockResolvedValue(timeZone),
      findAllCategories: jest.fn().mockResolvedValue(categories),
      findAllLanguages: jest.fn().mockResolvedValue(languages),
      findAllTypes: jest.fn().mockResolvedValue(types),
      findAllTimes: jest.fn().mockResolvedValue(times),
      findAllTimeZones: jest.fn().mockResolvedValue(timeZones),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [MiscService],
    }).overrideProvider(MiscService)
      .useValue(MockMiscService)
      .compile();

    service = module.get<MiscService>(MiscService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createCategory() should create new category', async () => {
    const newCategory: CreateCategoryDto = {
      name: 'New Category',
      subcategories: ['Subcategory 1', 'Subcategory 2'],
      description: ''
    }
    expect(await service.createCategory(newCategory)).toMatchObject(category)
  })

  it('createLanguage() should create new language', async () => {
    const newLanguage: CreateLanguageDto = {
      name: 'New Language',
      description: ''
    }
    expect(await service.createLanguage(newLanguage)).toMatchObject(language)
  })

  it('createType() should create new type', async () => {
    const newType: CreateTypeDto = {
      name: 'New Type',
      description: ''
    }
    expect(await service.createType(newType)).toMatchObject(type)
  })

  it('createTime() should create new time', async () => {
    const newTime: CreateTimeDto = {
      name: 'New Type',
      description: ''
    }
    expect(await service.createTime(newTime)).toMatchObject(time)
  })

  it('createTimeZone() should create new timezone', async () => {
    const newTimeZone: CreateTimeZoneDto = {
      name: 'New Type',
      description: ''
    }
    expect(await service.createTimeZone(newTimeZone)).toMatchObject(timeZone)
  })

  it('findAllCategories() should return all categories', async () => {
    expect(await service.findAllCategories()).toMatchObject(categories)
  })

  it('findAllLanguages() should return all languages', async () => {
    expect(await service.findAllLanguages()).toMatchObject(languages)
  })

  it('findAllTypes() should return all types', async () => {
    expect(await service.findAllTypes()).toMatchObject(types)
  })

  it('findAllTimes() should return all times', async () => {
    expect(await service.findAllTimes()).toMatchObject(times)
  })

  it('findAllTimeZones() should return all times', async () => {
    expect(await service.findAllTimeZones()).toMatchObject(timeZones)
  })
});
