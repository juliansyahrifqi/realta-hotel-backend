import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTaskService } from './service_task.service';

describe('ServiceTaskService', () => {
  let service: ServiceTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTaskService],
    }).compile();

    service = module.get<ServiceTaskService>(ServiceTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
