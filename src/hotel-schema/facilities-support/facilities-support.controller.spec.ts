import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesSupportController } from './facilities-support.controller';
import { FacilitiesSupportService } from './facilities-support.service';

describe('FacilitiesSupportController', () => {
  let controller: FacilitiesSupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilitiesSupportController],
      providers: [FacilitiesSupportService],
    }).compile();

    controller = module.get<FacilitiesSupportController>(FacilitiesSupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
