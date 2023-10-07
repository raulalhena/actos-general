import { Test, TestingModule } from '@nestjs/testing';
import { VisibilitiesController } from './visibilities.controller';
import { VisibilitiesService } from './visibilities.service';

describe('VisibilitiesController', () => {
  let controller: VisibilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisibilitiesController],
      providers: [VisibilitiesService],
    }).compile();

    controller = module.get<VisibilitiesController>(VisibilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
