import { Test, TestingModule } from '@nestjs/testing';
import { OrderMenusService } from './order_menus.service';

describe('OrderMenusService', () => {
  let service: OrderMenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderMenusService],
    }).compile();

    service = module.get<OrderMenusService>(OrderMenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
