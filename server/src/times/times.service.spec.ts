import { Test, TestingModule } from '@nestjs/testing';
import { TimesService } from './times.service';

describe('TimesService', () => {
  let service: TimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesService],
    }).compile();

    service = module.get<TimesService>(TimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
