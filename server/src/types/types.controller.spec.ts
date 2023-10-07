import { Test, TestingModule } from '@nestjs/testing';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';

describe('TypesController', () => {
  let controller: TypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesController],
      providers: [TypesService],
    }).compile();

    controller = module.get<TypesController>(TypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
