import { Test, TestingModule } from '@nestjs/testing';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';

describe('TimesController', () => {
  let controller: TimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesController],
      providers: [TimesService],
    }).compile();

    controller = module.get<TimesController>(TimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
