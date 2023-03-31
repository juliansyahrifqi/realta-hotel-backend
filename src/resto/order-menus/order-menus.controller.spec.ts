import { Test, TestingModule } from '@nestjs/testing';
import { OrderMenusController } from './order-menus.controller';

describe('OrderMenusController', () => {
  let controller: OrderMenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderMenusController],
    }).compile();

    controller = module.get<OrderMenusController>(OrderMenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
