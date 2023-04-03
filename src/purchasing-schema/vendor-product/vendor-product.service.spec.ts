import { Test, TestingModule } from '@nestjs/testing';
import { VendorProductService } from './vendor-product.service';

describe('VendorProductService', () => {
  let service: VendorProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorProductService],
    }).compile();

    service = module.get<VendorProductService>(VendorProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
