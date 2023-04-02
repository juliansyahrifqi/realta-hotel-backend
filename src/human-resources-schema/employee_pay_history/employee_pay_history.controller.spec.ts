import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePayHistoryController } from './employee_pay_history.controller';
import { EmployeePayHistoryService } from './employee_pay_history.service';

describe('EmployeePayHistoryController', () => {
  let controller: EmployeePayHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePayHistoryController],
      providers: [EmployeePayHistoryService],
    }).compile();

    controller = module.get<EmployeePayHistoryController>(EmployeePayHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
