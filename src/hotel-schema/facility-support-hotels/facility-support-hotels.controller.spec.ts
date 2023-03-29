import { Test, TestingModule } from '@nestjs/testing';
import { FacilitySupportHotelsController } from './facility-support-hotels.controller';
import { FacilitySupportHotelsService } from './facility-support-hotels.service';

describe('FacilitySupportHotelsController', () => {
  let controller: FacilitySupportHotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilitySupportHotelsController],
      providers: [FacilitySupportHotelsService],
    }).compile();

    controller = module.get<FacilitySupportHotelsController>(FacilitySupportHotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
