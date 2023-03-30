import { Test, TestingModule } from '@nestjs/testing';
import { CategoryGroupService } from './category_group.service';

describe('CategoryGroupService', () => {
  let service: CategoryGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryGroupService],
    }).compile();

    service = module.get<CategoryGroupService>(CategoryGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
