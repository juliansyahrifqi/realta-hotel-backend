import { Test, TestingModule } from '@nestjs/testing';
import { FacilitySupportHotelsService } from './facility-support-hotels.service';

describe('FacilitySupportHotelsService', () => {
  let service: FacilitySupportHotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilitySupportHotelsService],
    }).compile();

    service = module.get<FacilitySupportHotelsService>(FacilitySupportHotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
