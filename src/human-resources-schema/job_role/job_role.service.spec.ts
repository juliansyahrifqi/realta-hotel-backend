import { Test, TestingModule } from '@nestjs/testing';
import { JobRoleService } from './job_role.service';

describe('JobRoleService', () => {
  let service: JobRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobRoleService],
    }).compile();

    service = module.get<JobRoleService>(JobRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
