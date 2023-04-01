import { Test, TestingModule } from '@nestjs/testing';
import { BookingOrdersController } from './booking_orders.controller';
import { BookingOrdersService } from './booking_orders.service';

describe('BookingOrdersController', () => {
  let controller: BookingOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingOrdersController],
      providers: [BookingOrdersService],
    }).compile();

    controller = module.get<BookingOrdersController>(BookingOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
