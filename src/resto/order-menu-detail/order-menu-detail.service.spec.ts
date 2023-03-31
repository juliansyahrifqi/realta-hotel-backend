import { Test, TestingModule } from '@nestjs/testing';
import { OrderMenuDetailService } from './order-menu-detail.service';

describe('OrderMenuDetailService', () => {
  let service: OrderMenuDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderMenuDetailService],
    }).compile();

    service = module.get<OrderMenuDetailService>(OrderMenuDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
