import { Test, TestingModule } from '@nestjs/testing';
import { VisibilitiesService } from './visibilities.service';

describe('VisibilitiesService', () => {
  let service: VisibilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisibilitiesService],
    }).compile();

    service = module.get<VisibilitiesService>(VisibilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
