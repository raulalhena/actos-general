import { Test, TestingModule } from '@nestjs/testing';
import { CapacitiesController } from './capacities.controller';
import { CapacitiesService } from './capacities.service';

describe('CapacitiesController', () => {
  let controller: CapacitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapacitiesController],
      providers: [CapacitiesService],
    }).compile();

    controller = module.get<CapacitiesController>(CapacitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
