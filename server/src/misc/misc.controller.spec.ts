import { Test, TestingModule } from '@nestjs/testing';
import { MiscController } from './misc.controller';
import { MiscService } from './misc.service';
import { getModelToken } from '@nestjs/mongoose';
import { Capacity } from './schemas/capacity.schema';
import { Category } from './schemas/category.schema';
import { Language } from './schemas/language.schema';
import { Subcategory } from './schemas/subcategory.schema';
import { Time } from './schemas/time.schema';
import { TimeZone } from './schemas/timezone.schema';
import { Type } from './schemas/type.schema';
import { Visibility } from './schemas/visibility.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateTimeDto } from './dto/create-time.dto';
import { CreateTimeZoneDto } from './dto/create-timezone.dto';

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

describe('MiscController', () => {
  let controller: MiscController;

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
      controllers: [MiscController],
      providers: [MiscService, 
      {
        provide: getModelToken(Capacity.name),
        useValue: {}
      },
      {
        provide: getModelToken(Category.name),
        useValue: {}
      },
      {
        provide: getModelToken(Language.name),
        useValue: {}
      },
      {
        provide: getModelToken(Subcategory.name),
        useValue: {}
      },
      {
        provide: getModelToken(Time.name),
        useValue: {}
      },
      {
        provide: getModelToken(TimeZone.name),
        useValue: {}
      },
      {
        provide: getModelToken(Type.name),
        useValue: {}
      },
      {
        provide: getModelToken(Visibility.name),
        useValue: {}
      },
    ],
    }).overrideProvider(MiscService)
      .useValue(MockMiscService)
      .compile();

    controller = module.get<MiscController>(MiscController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createCategory() should create new category', async () => {
    const newCategory: CreateCategoryDto = {
      name: 'New Category',
      subcategories: ['Subcategory 1', 'Subcategory 2'],
      description: ''
    }
    expect(await controller.createCategory(newCategory)).toMatchObject(category)
  })

  it('createLanguage() should create new language', async () => {
    const newLanguage: CreateLanguageDto = {
      name: 'New Language',
      description: ''
    }
    expect(await controller.createLanguage(newLanguage)).toMatchObject(language)
  })

  it('createType() should create new type', async () => {
    const newType: CreateTypeDto = {
      name: 'New Type',
      description: ''
    }
    expect(await controller.createType(newType)).toMatchObject(type)
  })

  it('createTime() should create new time', async () => {
    const newTime: CreateTimeDto = {
      name: 'New Type',
      description: ''
    }
    expect(await controller.createTime(newTime)).toMatchObject(time)
  })

  it('createTimeZone() should create new timezone', async () => {
    const newTimeZone: CreateTimeZoneDto = {
      name: 'New Type',
      description: ''
    }
    expect(await controller.createTimeZone(newTimeZone)).toMatchObject(timeZone)
  })

  it('findAllCategories() should return all categories', async () => {
    expect(await controller.findAllCategories()).toMatchObject(categories)
  })

  it('findAllLanguages() should return all languages', async () => {
    expect(await controller.findAllLanguages()).toMatchObject(languages)
  })

  it('findAllTypes() should return all types', async () => {
    expect(await controller.findAllTypes()).toMatchObject(types)
  })

  it('findAllTimes() should return all times', async () => {
    expect(await controller.findAllTimes()).toMatchObject(times)
  })

  it('findAllTimeZones() should return all times', async () => {
    expect(await controller.findAllTimeZones()).toMatchObject(timeZones)
  })
  
});
