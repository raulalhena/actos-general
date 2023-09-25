import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {

    const mockUserService = {}

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
