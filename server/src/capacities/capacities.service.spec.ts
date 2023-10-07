import { Test, TestingModule } from '@nestjs/testing';
import { CapacitiesService } from './capacities.service';

describe('CapacitiesService', () => {
  let service: CapacitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapacitiesService],
    }).compile();

    service = module.get<CapacitiesService>(CapacitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
