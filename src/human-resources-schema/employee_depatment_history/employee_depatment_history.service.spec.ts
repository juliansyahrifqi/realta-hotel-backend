import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDepatmentHistoryService } from './employee_depatment_history.service';

describe('EmployeeDepatmentHistoryService', () => {
  let service: EmployeeDepatmentHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDepatmentHistoryService],
    }).compile();

    service = module.get<EmployeeDepatmentHistoryService>(
      EmployeeDepatmentHistoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
