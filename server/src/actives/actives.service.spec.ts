import { Test, TestingModule } from '@nestjs/testing';
import { ActivesService } from './actives.service';

describe('ActivesService', () => {
  let service: ActivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivesService],
    }).compile();

    service = module.get<ActivesService>(ActivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
