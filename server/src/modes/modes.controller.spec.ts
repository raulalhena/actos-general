import { Test, TestingModule } from '@nestjs/testing';
import { ModesController } from './modes.controller';
import { ModesService } from './modes.service';

describe('ModesController', () => {
  let controller: ModesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModesController],
      providers: [ModesService],
    }).compile();

    controller = module.get<ModesController>(ModesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
