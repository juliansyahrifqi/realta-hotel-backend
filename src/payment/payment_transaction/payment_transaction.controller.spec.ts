import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTransactionController } from './payment_transaction.controller';
import { PaymentTransactionService } from './payment_transaction.service';

describe('PaymentTransactionController', () => {
  let controller: PaymentTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentTransactionController],
      providers: [PaymentTransactionService],
    }).compile();

    controller = module.get<PaymentTransactionController>(PaymentTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
