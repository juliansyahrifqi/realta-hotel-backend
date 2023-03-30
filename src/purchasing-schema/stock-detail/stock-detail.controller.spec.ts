import { Test, TestingModule } from '@nestjs/testing';
import { StockDetailController } from './stock-detail.controller';
import { StockDetailService } from './stock-detail.service';

describe('StockDetailController', () => {
  let controller: StockDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockDetailController],
      providers: [StockDetailService],
    }).compile();

    controller = module.get<StockDetailController>(StockDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
