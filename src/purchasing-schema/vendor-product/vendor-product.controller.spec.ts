import { Test, TestingModule } from '@nestjs/testing';
import { VendorProductController } from './vendor-product.controller';
import { VendorProductService } from './vendor-product.service';

describe('VendorProductController', () => {
  let controller: VendorProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorProductController],
      providers: [VendorProductService],
    }).compile();

    controller = module.get<VendorProductController>(VendorProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
