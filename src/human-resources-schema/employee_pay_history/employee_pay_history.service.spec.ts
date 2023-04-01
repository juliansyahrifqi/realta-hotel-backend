import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePayHistoryService } from './employee_pay_history.service';

describe('EmployeePayHistoryService', () => {
  let service: EmployeePayHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeePayHistoryService],
    }).compile();

    service = module.get<EmployeePayHistoryService>(EmployeePayHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
