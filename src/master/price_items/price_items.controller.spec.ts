import { Test, TestingModule } from '@nestjs/testing';
import { PriceItemsController } from './price_items.controller';
import { PriceItemsService } from './price_items.service';

describe('PriceItemsController', () => {
  let controller: PriceItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceItemsController],
      providers: [PriceItemsService],
    }).compile();

    controller = module.get<PriceItemsController>(PriceItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
