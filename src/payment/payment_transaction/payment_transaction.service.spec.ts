import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTransactionService } from './payment_transaction.service';

describe('PaymentTransactionService', () => {
  let service: PaymentTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentTransactionService],
    }).compile();

    service = module.get<PaymentTransactionService>(PaymentTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
