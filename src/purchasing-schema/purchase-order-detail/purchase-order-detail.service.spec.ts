import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';

describe('PurchaseOrderDetailService', () => {
  let service: PurchaseOrderDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseOrderDetailService],
    }).compile();

    service = module.get<PurchaseOrderDetailService>(PurchaseOrderDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
