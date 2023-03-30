import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTaskController } from './service_task.controller';
import { ServiceTaskService } from './service_task.service';

describe('ServiceTaskController', () => {
  let controller: ServiceTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceTaskController],
      providers: [ServiceTaskService],
    }).compile();

    controller = module.get<ServiceTaskController>(ServiceTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
