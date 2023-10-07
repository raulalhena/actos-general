import { Test, TestingModule } from '@nestjs/testing';
import { ActivesController } from './actives.controller';
import { ActivesService } from './actives.service';

describe('ActivesController', () => {
  let controller: ActivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivesController],
      providers: [ActivesService],
    }).compile();

    controller = module.get<ActivesController>(ActivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
