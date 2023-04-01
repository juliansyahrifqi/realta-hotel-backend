import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderDetailController } from './work_order_detail.controller';
import { WorkOrderDetailService } from './work_order_detail.service';

describe('WorkOrderDetailController', () => {
  let controller: WorkOrderDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkOrderDetailController],
      providers: [WorkOrderDetailService],
    }).compile();

    controller = module.get<WorkOrderDetailController>(WorkOrderDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
