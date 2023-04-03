import { Test, TestingModule } from '@nestjs/testing';
import { FacilityPriceHistoryService } from './facility-price-history.service';

describe('FacilityPriceHistoryService', () => {
  let service: FacilityPriceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityPriceHistoryService],
    }).compile();

    service = module.get<FacilityPriceHistoryService>(FacilityPriceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
