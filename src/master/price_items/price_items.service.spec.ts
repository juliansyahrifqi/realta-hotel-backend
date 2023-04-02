import { Test, TestingModule } from '@nestjs/testing';
import { PriceItemsService } from './price_items.service';

describe('PriceItemsService', () => {
  let service: PriceItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceItemsService],
    }).compile();

    service = module.get<PriceItemsService>(PriceItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
