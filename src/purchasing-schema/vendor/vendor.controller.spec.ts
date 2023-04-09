import { Test, TestingModule } from '@nestjs/testing';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';

describe('VendorController', () => {
  let controller: VendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorController],
      providers: [VendorService],
    }).compile();

    controller = module.get<VendorController>(VendorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
