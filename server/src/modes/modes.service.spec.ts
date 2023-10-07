import { Test, TestingModule } from '@nestjs/testing';
import { ModesService } from './modes.service';

describe('ModesService', () => {
  let service: ModesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModesService],
    }).compile();

    service = module.get<ModesService>(ModesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
