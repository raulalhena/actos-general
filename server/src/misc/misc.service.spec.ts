import { Test, TestingModule } from '@nestjs/testing';
import { MiscService } from './misc.service';

describe('MiscService', () => {
  let service: MiscService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiscService],
    }).compile();

    service = module.get<MiscService>(MiscService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
