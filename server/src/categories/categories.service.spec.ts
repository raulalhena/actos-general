import { TestingModule, Test } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CreateSubcategoryDto } from "./dto/create-subcategory.dto";
import { ObjectId, Schema, Types } from 'mongoose'

const newCategory: CreateCategoryDto = {
  name: 'category',
  description: 'category description',
  subcategories: ['subcategorie'],
};

const newSubcategory: CreateSubcategoryDto = {
  name: 'subcategory',
  description: 'subcategory description',
  image: 'subcategory image',
};

const mockCategoriesService = {
  createCategory: jest.fn().mockResolvedValue(newCategory),
  createSubcategory: jest.fn().mockResolvedValue(newCategory), 
  findAllCategories: jest.fn().mockResolvedValue([]), 
  findAllSubcategories: jest.fn().mockResolvedValue([]), 
  findCategoryById: jest.fn().mockResolvedValue(newCategory),
  bulkCreateCategory: jest.fn().mockResolvedValue([newCategory]), 
  bulkCreateSubcategory: jest.fn().mockResolvedValue([newSubcategory]), 
  deleteCategory: jest.fn().mockResolvedValue(undefined),
  deleteSubcategory: jest.fn().mockResolvedValue(newCategory), 
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a category', async () => {
      const createdCategory = await service.createCategory(newCategory);

      expect(createdCategory).toEqual(newCategory);
    });
  });

  describe('createSubcategory', () => {
    it('should create a subcategory', async () => {
      const categoryId = new Schema.Types.ObjectId('651193c63b3c0c567fe7c2f1');
      const createdSubcategory = await service.createSubcategory(categoryId, newSubcategory);
  
      expect(createdSubcategory).toEqual(newCategory);
    });
  });

  describe('findAllCategories', () => {
    it('should return an array of categories', async () => {
      const categories = await service.findAllCategories();

      expect(categories).toEqual([]); 
    });
  });

  describe('findAllSubcategories', () => {
    it('should return an array of subcategories for a category', async () => {
      const categoryId = new Schema.Types.ObjectId('651193c63b3c0c567fe7c2f1');
      const subcategories = await service.findAllSubcategories(categoryId);

      expect(subcategories).toEqual([]);
    });
  });

  describe('findCategoryById', () => {
    it('should find a category by ID', async () => {
      const categoryId = new Schema.Types.ObjectId('651193c63b3c0c567fe7c2f1');
      const foundCategory = await service.findCategoryById(categoryId);

      expect(foundCategory).toEqual(newCategory);
    });
  });

  describe('bulkCreateCategory', () => {
    it('should create multiple categories in bulk', async () => {
      const createCategoryDtos: CreateCategoryDto[] = [newCategory];
      const createdCategories = await service.bulkCreateCategory(createCategoryDtos);

      expect(createdCategories).toEqual([newCategory]); 
    });
  });

  describe('bulkCreateSubcategory', () => {
    it('should create multiple subcategories for a category in bulk', async () => {
       const categoryId = new Schema.Types.ObjectId('651193c63b3c0c567fe7c2f1');
      const createSubcategoryDtos: CreateSubcategoryDto[] = [newSubcategory];
      const createdSubcategories = await service.bulkCreateSubcategory(categoryId, createSubcategoryDtos);
  
     
      expect(createdSubcategories).toEqual([newSubcategory]);
    });
  });
  

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const categoryId = '651193c63b3c0c567fe7c2f1';
      await service.deleteCategory(categoryId);

      expect(mockCategoriesService.deleteCategory).toHaveBeenCalledWith(categoryId);
    });
  });

  describe('deleteSubcategory', () => {
    it('should delete a subcategory from a category', async () => {
      const categoryId = new Schema.Types.ObjectId('651193c63b3c0c567fe7c2f1');
      const subcategoryName = 'subcategory';
      const updatedCategory = await service.deleteSubcategory(categoryId, subcategoryName);

      expect(updatedCategory).toEqual(newCategory); 
    });
  });
});
