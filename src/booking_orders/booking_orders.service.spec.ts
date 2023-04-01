import { Test, TestingModule } from '@nestjs/testing';
import { BookingOrdersService } from './booking_orders.service';

describe('BookingOrdersService', () => {
  let service: BookingOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingOrdersService],
    }).compile();

    service = module.get<BookingOrdersService>(BookingOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
