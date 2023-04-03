import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDepatmentHistoryController } from './employee_depatment_history.controller';
import { EmployeeDepatmentHistoryService } from './employee_depatment_history.service';

describe('EmployeeDepatmentHistoryController', () => {
  let controller: EmployeeDepatmentHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeDepatmentHistoryController],
      providers: [EmployeeDepatmentHistoryService],
    }).compile();

    controller = module.get<EmployeeDepatmentHistoryController>(EmployeeDepatmentHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
