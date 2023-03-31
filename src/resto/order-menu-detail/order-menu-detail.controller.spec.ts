import { Test, TestingModule } from '@nestjs/testing';
import { OrderMenuDetailController } from './order-menu-detail.controller';

describe('OrderMenuDetailController', () => {
  let controller: OrderMenuDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderMenuDetailController],
    }).compile();

    controller = module.get<OrderMenuDetailController>(OrderMenuDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
