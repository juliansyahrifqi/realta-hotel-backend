import { Test, TestingModule } from '@nestjs/testing';
import { StockDetailService } from './stock-detail.service';

describe('StockDetailService', () => {
  let service: StockDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockDetailService],
    }).compile();

    service = module.get<StockDetailService>(StockDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
