import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderDetailService } from './work_order_detail.service';

describe('WorkOrderDetailService', () => {
  let service: WorkOrderDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrderDetailService],
    }).compile();

    service = module.get<WorkOrderDetailService>(WorkOrderDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
