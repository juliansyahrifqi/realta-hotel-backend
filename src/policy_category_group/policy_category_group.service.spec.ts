import { Test, TestingModule } from '@nestjs/testing';
import { PolicyCategoryGroupService } from './policy_category_group.service';

describe('PolicyCategoryGroupService', () => {
  let service: PolicyCategoryGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolicyCategoryGroupService],
    }).compile();

    service = module.get<PolicyCategoryGroupService>(PolicyCategoryGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
