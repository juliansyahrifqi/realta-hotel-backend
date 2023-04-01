import { Test, TestingModule } from '@nestjs/testing';
import { OrderMenusController } from './order_menus.controller';
import { OrderMenusService } from './order_menus.service';

describe('OrderMenusController', () => {
  let controller: OrderMenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderMenusController],
      providers: [OrderMenusService],
    }).compile();

    controller = module.get<OrderMenusController>(OrderMenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
