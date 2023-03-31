import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenusService } from './resto-menus.service';

describe('RestoMenusService', () => {
  let service: RestoMenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestoMenusService],
    }).compile();

    service = module.get<RestoMenusService>(RestoMenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
